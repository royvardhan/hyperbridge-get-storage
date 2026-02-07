// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {Script, console} from "forge-std/Script.sol";
import {Storage} from "../src/Storage.sol";

contract DeployStorage is Script {
    function run() external {
        address ismpHost = vm.envAddress("BSC_TESTNET_HOST");
        address feeToken = vm.envAddress("BSC_TESTNET_FEE_TOKEN");

        vm.startBroadcast();

        Storage storageContract = new Storage(ismpHost, feeToken);
        console.log("Storage deployed at:", address(storageContract));

        vm.stopBroadcast();
    }
}
