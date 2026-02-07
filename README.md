# Hyperbridge Get Request

Demo of **cross-chain storage queries** using [Hyperbridge](https://hyperbridge.network/) (ISMP). The `Storage` contract lets you query EVM storage on another chain—e.g. an ERC20 balance on Sepolia from BSC Testnet.

## Storage contract

- **`queryTokenBalance(token, relayerFee, slot, height, timeout)`** — Dispatches a Get request for `(token, slot)` to a destination chain (e.g. Sepolia). Fee can be paid in native token (msg.value) or in the host’s fee token.
- **`onGetResponse`** — Called by the host when the response is relayed; stores key/value results and clears the pending query.
- **`getQueryResult(commitment, key)`** — Returns the stored value for a given request and key.

Results are stored in `queryResults` and emitted as `StorageQueryReceived`.

## Test

The test in `test/storage.test.ts` runs an end-to-end flow:

1. Resolves the USDC balance storage slot for a user on Sepolia.
2. Calls `queryTokenBalance` on BSC Testnet targeting that slot.
3. Waits for the request to be finalized on Hyperbridge and self-relays the response via the Handler.
4. Asserts the request/response flow completes.

**Run:** `pnpm test` (ensure `.env` is set with RPC URLs, host/handler addresses, `PRIVATE_KEY`, `STORAGE_ADDRESS`, etc.).

**Setup:** `git submodule update --init --recursive` for `forge-std` and other deps.
