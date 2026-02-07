// Deploy
source .env

forge script script/DeployStorage.s.sol:DeployStorage \
 --rpc-url $RPC_URL \
 --private-key $PRIVATE_KEY \
 --broadcast \

// Verify the contract on Blockscout Testnet

forge verify-contract 0x6dce44e1928b997973fa2336BCCfea262ff4DE84 src/Storage.sol:Storage \
 --rpc-url $RPC_URL \
 --constructor-args $(cast abi-encode "constructor(address,address)" $ISMP_HOST $FEE_TOKEN) \
 --verifier blockscout \
 --verifier-url https://blockscout-testnet.polkadot.io/api/
