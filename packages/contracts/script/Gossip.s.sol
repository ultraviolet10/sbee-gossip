// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import {Script, console2} from "forge-std/Script.sol";
import {Semaphore} from "@semaphore-protocol/contracts/Semaphore.sol";
import {SemaphoreVerifier} from "@semaphore-protocol/contracts/base/SemaphoreVerifier.sol";
import {ISemaphoreVerifier} from "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";
import {Gossip} from "../src/Gossip.sol";

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

        log("SemaphoreVerifier address", address(verifier));
        log("Semaphore address", address(semaphore));
        log("Gossip address", address(gossip));

        vm.stopBroadcast();
    }
}
