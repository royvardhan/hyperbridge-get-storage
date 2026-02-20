import {
  bytes20ToBytes32,
  createQueryClient,
  ERC20Method,
  getChain,
  getRequestCommitment,
  getStorageSlot,
  HexString,
  IndexerClient,
  RequestStatus,
  SubstrateChain,
} from "@hyperbridge/sdk";
import {
  createPublicClient,
  createWalletClient,
  decodeFunctionData,
  erc20Abi,
  http,
  maxUint256,
  parseEventLogs,
} from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { bscTestnet } from "viem/chains";
import { afterAll, beforeAll, describe, expect, it } from "vitest";
import "dotenv/config";

import { EVM_HOST } from "../abis/EvmHost.ts";
import { HANDLER } from "../abis/Handler.ts";
import { STORAGE_ABI } from "../abis/Storage.ts";

// --- Constants -----------------------------------------------------------------------------------

const STATE_SCAN_EXTRINSIC_URL = "https://gargantua.statescan.io/#/extrinsics";
const BSC_SCAN_TX_URL = "https://testnet.bscscan.com/tx";

const USER_ADDRESS = "0xEa4f68301aCec0dc9Bbe10F15730c59FB79d237E";
const USDC_ADDRESS = "0x1c7D4B196Cb0C7B01d743Fbc6116a902379C7238" as HexString;

const SEPOLIA_STATE_ID = {
  stateId: { Evm: 11155111 },
  consensusStateId: "ETH0", // Now supports simple strings
};

// --- Helpers -------------------------------------------------------------------------------------

function createBscClients() {
  const publicClient = createPublicClient({
    transport: http(process.env.BSC_TESTNET),
    chain: bscTestnet,
  });
  const walletClient = createWalletClient({
    account: privateKeyToAccount(process.env.PRIVATE_KEY as `0x${string}`),
    transport: http(process.env.BSC_TESTNET),
    chain: bscTestnet,
  });
  return { publicClient, walletClient };
}

function createEthPublicClient() {
  return createPublicClient({
    transport: http(process.env.ETH_SEPOLIA),
  });
}

async function ensureAllowance(
  publicClient: ReturnType<typeof createPublicClient>,
  walletClient: ReturnType<typeof createWalletClient>,
  token: `0x${string}`,
  spender: `0x${string}`,
) {
  const account = walletClient.account!;
  const allowance = await publicClient.readContract({
    address: token,
    abi: erc20Abi,
    functionName: "allowance",
    args: [account.address, spender],
  });
  if (allowance >= maxUint256 / 2n) return;
  const hash = await walletClient.writeContract({
    address: token,
    abi: erc20Abi,
    functionName: "approve",
    args: [spender, maxUint256],
    account,
    chain: bscTestnet,
  });
  await publicClient.waitForTransactionReceipt({ hash });
}

function logStatus(
  status: string,
  txHash: string,
  baseUrl = STATE_SCAN_EXTRINSIC_URL,
) {
  const url = baseUrl.includes("bscscan")
    ? `${BSC_SCAN_TX_URL}/${txHash}`
    : `${baseUrl}/${txHash}`;
  console.log(`Status ${status}, Transaction: ${url}`);
}

// --- Tests ----------------------------------------------------------------------------------------

describe("Storage", () => {
  let indexer: IndexerClient;
  let hyperbridge: SubstrateChain;

  beforeAll(async () => {
    const queryClient = createQueryClient({ url: process.env.INDEXER_URL! });

    const sourceChain = await getChain({
      consensusStateId: "BSC0",
      rpcUrl: process.env.BSC_TESTNET!,
      stateMachineId: "EVM-97",
      host: process.env.BSC_TESTNET_HOST! as `0x${string}`,
    });

    const destChain = await getChain({
      consensusStateId: "ETH0",
      rpcUrl: process.env.ETH_SEPOLIA!,
      stateMachineId: "EVM-11155111",
      host: process.env.ETH_SEPOLIA_HOST! as `0x${string}`,
    });

    const hyperbridgeChain = await getChain({
      consensusStateId: "PAS0",
      stateMachineId: "KUSAMA-4009",
      wsUrl: process.env.HYPERBRIDGE_GARGANTUA!,
      hasher: "Keccak",
    });

    indexer = new IndexerClient({
      source: sourceChain,
      dest: destChain,
      hyperbridge: hyperbridgeChain,
      queryClient,
      pollInterval: 1_000,
    });

    hyperbridge = new SubstrateChain({
      wsUrl: process.env.HYPERBRIDGE_GARGANTUA!,
      hasher: "Keccak",
      consensusStateId: "PAS0",
      stateMachineId: "KUSAMA-4009",
    });

    await hyperbridge.connect();
  }, 100_000);

  afterAll(async () => {
    await hyperbridge.disconnect();
  });

  it("should get storage slot and call readStorage", async () => {
    const ethClient = createEthPublicClient();
    const { publicClient: bscPublic, walletClient: bscWallet } =
      createBscClients();

    const storageAddress = process.env.STORAGE_ADDRESS as `0x${string}`;
    const feeToken = process.env.BSC_TESTNET_FEE_TOKEN as `0x${string}`;
    const handlerAddress = process.env.BSC_TESTNET_HANDLER as `0x${string}`;

    // Resolve slot for USDC balance of user on Sepolia
    const balanceOfData =
      ERC20Method.BALANCE_OF + bytes20ToBytes32(USER_ADDRESS).slice(2);
    const slot = (await getStorageSlot(
      ethClient,
      USDC_ADDRESS,
      balanceOfData as `0x${string}`,
    )) as HexString;

    const height = await hyperbridge.latestStateMachineHeight(SEPOLIA_STATE_ID);

    await ensureAllowance(bscPublic, bscWallet, feeToken, storageAddress);

    // Submit cross-chain query
    const txHash = await bscWallet.writeContract({
      address: storageAddress,
      abi: STORAGE_ABI,
      functionName: "queryTokenBalance",
      args: [USDC_ADDRESS, 0n, slot, height, 0n],
      account: bscWallet.account,
    });

    const receipt = await bscPublic.waitForTransactionReceipt({ hash: txHash });
    const [event] = parseEventLogs({ abi: EVM_HOST, logs: receipt.logs });

    if (event?.eventName !== "GetRequestEvent") {
      throw new Error("Expected GetRequestEvent");
    }

    const request = event.args;
    const commitment = getRequestCommitment({
      ...request,
      keys: [...request.keys],
    });

    console.log(`Commitment: ${commitment}`);

    // Consume status stream and self-relay when Hyperbridge has finalized
    for await (const status of indexer.getRequestStatusStream(commitment)) {
      const txUrl = status.metadata.transactionHash;

      switch (status.status) {
        case RequestStatus.SOURCE_FINALIZED:
        case RequestStatus.HYPERBRIDGE_DELIVERED:
          logStatus(status.status, txUrl);
          break;

        case RequestStatus.HYPERBRIDGE_FINALIZED: {
          logStatus(status.status, txUrl, BSC_SCAN_TX_URL);
          const { args, functionName } = decodeFunctionData({
            abi: HANDLER,
            data: status.metadata.calldata,
          });
          expect(functionName).toBe("handleGetResponses");

          try {
            const relayHash = await bscWallet.writeContract({
              abi: HANDLER,
              address: handlerAddress,
              functionName: "handleGetResponses",
              args: args as any,
              account: bscWallet.account!,
            });
            await bscPublic.waitForTransactionReceipt({
              hash: relayHash,
              confirmations: 1,
            });
            console.log(`Self-relay tx: ${BSC_SCAN_TX_URL}/${relayHash}`);
          } catch (e) {
            console.error("Self-relay failed:", e);
          }
          break;
        }

        case RequestStatus.DESTINATION:
          logStatus(status.status, txUrl, BSC_SCAN_TX_URL);
          break;
      }
    }
  }, 400_000);
});
