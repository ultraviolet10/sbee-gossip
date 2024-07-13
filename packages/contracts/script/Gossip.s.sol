// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console, console2} from "forge-std/Script.sol";
import {Semaphore} from "@semaphore-protocol/contracts/Semaphore.sol";
import {SemaphoreVerifier} from "@semaphore-protocol/contracts/base/SemaphoreVerifier.sol";
import {ISemaphoreVerifier} from "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";
import {Gossip} from "../src/Gossip.sol";
import {ECDSA} from "@openzeppelin/contracts/utils/cryptography/ECDSA.sol";

contract GossipScript is Script {
    SemaphoreVerifier public verifier;
    Semaphore public semaphore;
    Gossip public gossip;

    bool private doLog = true;

    function dontLog() external {
        doLog = false;
    }

    function log(string memory s, address a) private view {
        if (doLog) {
            console2.log(s, a); // solhint-disable-line
        }
    }

    function run() external {
        vm.startBroadcast();

        // deploy
        verifier = new SemaphoreVerifier();
        semaphore = new Semaphore(ISemaphoreVerifier(address(verifier)));
        gossip = new Gossip(address(semaphore));

        // Create a Semaphore group with the deployer as the admin
        uint256 currGroupId = semaphore.groupCounter();
        /*
            - add first 5 wallets as users to semaphore group
            - identity commitments should be pvt key + message signature hash
         */

        // Corresponding private keys (for test purposes only, never share private keys in production)
        uint256[4] memory privateKeys = [
            uint256(0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d),
            uint256(0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a),
            uint256(0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6),
            uint256(0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a)
        ];

        // Message to sign
        bytes32 messageHash = keccak256(abi.encodePacked("truths galore"));

        // Generate signature hashes and add users to Semaphore group
        for (uint256 i = 0; i < 4; i++) {
            (uint8 v, bytes32 r, bytes32 s) = vm.sign(privateKeys[i], messageHash);
            bytes memory signature = abi.encodePacked(r, s, v);
            address signer = ECDSA.recover(messageHash, signature);

            // Convert address to uint256 for identity commitment
            uint256 identityCommitment = uint256(uint160(signer));

            // first group - [0]
            gossip.joinGroup(identityCommitment);
        }

        // log deployed contract addresses
        log("SemaphoreVerifier address", address(verifier));
        log("Semaphore address", address(semaphore));
        log("Gossip address", address(gossip));

        vm.stopBroadcast();
    }
}
