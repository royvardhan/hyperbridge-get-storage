// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {DispatchGet, IDispatcher} from "@hyperbridge/core/interfaces/IDispatcher.sol";
import {GetRequest, IncomingGetResponse} from "@hyperbridge/core/interfaces/IApp.sol";
import {Message} from "@hyperbridge/core/libraries/Message.sol";
import {HyperApp} from "@hyperbridge/core/apps/HyperApp.sol";
import {StorageValue} from "@polytope-labs/solidity-merkle-trees/src/Types.sol";
import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {RLPReader} from "Solidity-RLP/contracts/RLPReader.sol";

contract Storage is HyperApp {
    using SafeERC20 for IERC20;
    using Message for GetRequest;
    using RLPReader for bytes;
    using RLPReader for RLPReader.RLPItem;

    event StorageQueryDispatched(bytes32 indexed commitment, address token, bytes32 slot);

    event StorageQueryReceived(bytes32 indexed commitment, bytes key, uint256 value);

    /// @notice Stores the results of storage queries (commitment => key => value)
    mapping(bytes32 => mapping(bytes => uint256)) public queryResults;

    /// @notice Tracks pending queries (commitment => exists)
    mapping(bytes32 => bool) public pendingQueries;

    address private _host;

    constructor(address ismpHost, address feeToken) {
        _host = ismpHost;
        IERC20(feeToken).approve(_host, type(uint256).max);
    }

    function host() public view override returns (address) {
        return _host;
    }

    function queryTokenBalance(address token, uint256 relayerFee, bytes32 slot, uint64 height, uint64 timeout)
        public
        payable
        returns (bytes32 commitment)
    {
        bytes[] memory keys = new bytes[](1);
        keys[0] = abi.encodePacked(token, slot);

        DispatchGet memory get = DispatchGet({
            dest: bytes("EVM-11155111"),
            height: height,
            keys: keys,
            timeout: timeout,
            fee: relayerFee,
            context: new bytes(0)
        });

        if (msg.value > 0) {
            commitment = IDispatcher(_host).dispatch{value: msg.value}(get);
        } else {
            address feeToken = IDispatcher(_host).feeToken();
            uint256 fee = quote(get);
            IERC20(feeToken).safeTransferFrom(msg.sender, address(this), fee);
            commitment = IDispatcher(_host).dispatch(get);
        }

        pendingQueries[commitment] = true;

        emit StorageQueryDispatched(commitment, token, slot);
        return commitment;
    }

    function onGetResponse(IncomingGetResponse memory incoming) external override onlyHost {
        bytes32 commitment = incoming.response.request.hash();

        if (!pendingQueries[commitment]) {
            return;
        }

        StorageValue[] memory values = incoming.response.values;
        for (uint256 i = 0; i < values.length; i++) {
            uint256 decoded = values[i].value.toRlpItem().toUint();
            queryResults[commitment][values[i].key] = decoded;
            emit StorageQueryReceived(commitment, values[i].key, decoded);
        }

        // Mark query as completed
        pendingQueries[commitment] = false;
    }

    function getQueryResult(bytes32 commitment, bytes calldata key) external view returns (uint256) {
        return queryResults[commitment][key];
    }
}
