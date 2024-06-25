// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.23;

import {console2} from "forge-std/Script.sol";
import {Test, console} from "forge-std/Test.sol";
import {Gossip} from "../src/Gossip.sol";
import {Semaphore} from "@semaphore-protocol/contracts/Semaphore.sol";
import {SemaphoreVerifier} from "@semaphore-protocol/contracts/base/SemaphoreVerifier.sol";
import {ISemaphoreVerifier} from "@semaphore-protocol/contracts/interfaces/ISemaphoreVerifier.sol";

import {PoseidonT3} from "poseidon-solidity/PoseidonT3.sol";

contract GossipTest is Test {
    SemaphoreVerifier public verifier;
    Semaphore public semaphore;
    Gossip public gossip;

    // user mapping
    uint256[5] public users;

    // events emitted
    event NewUser(uint256 identityCommitment, bytes32 username);
    event GroupCreated(uint256 indexed groupId);
    event GroupAdminUpdated(
        uint256 indexed groupId,
        address indexed oldAdmin,
        address indexed newAdmin
    );
    event MemberAdded(
        uint256 indexed groupId,
        uint256 index,
        uint256 identityCommitment,
        uint256 merkleTreeRoot
    );

    function setUp() external {
        verifier = new SemaphoreVerifier();
        semaphore = new Semaphore(ISemaphoreVerifier(address(verifier)));
        gossip = new Gossip(address(semaphore));

        // users' identity commitments (?)
        users[0] = 123;
        users[1] = 546;
        users[2] = 789;
        // users[3] = randomNumber(type(uint256).max);
        // users[4] = randomNumber(type(uint256).max);
    }

    function test_AddUsers() external {
        // does the js library function in a similar manner?

        // add 1 user
        vm.expectEmit(true, true, true, true);
        emit MemberAdded(0, 0, users[0], users[0]);
        gossip.joinGroup(users[0]);

        // adding 2nd user updates the merkle tree root using poseidonT3
        uint newRootHash = PoseidonT3.hash([users[0], users[1]]);
        vm.expectEmit(true, true, true, true);
        emit MemberAdded(0, 1, users[1], newRootHash);
        gossip.joinGroup(users[1]);

        // 3rd user
        uint newerRootHash = PoseidonT3.hash([newRootHash, users[2]]);
        vm.expectEmit(true, true, true, true);
        emit MemberAdded(0, 2, users[2], newerRootHash);
        gossip.joinGroup(users[2]);
    }

    function test_GroupCreation() external {
        assertEq(semaphore.groupCounter(), 1);
        assertEq(gossip.groupId(), 0);

        // events emitted on new group creation, group counter goes up to 2
        // first group that is created is with ID 0
        vm.expectEmit(true, false, false, false);
        emit GroupCreated(1);
        vm.expectEmit(true, true, true, false);
        emit GroupAdminUpdated(1, address(0), address(this));

        // create new group
        semaphore.createGroup();

        // groupCounter is post incremented to 1 for next group creation
        assertEq(semaphore.groupCounter(), 2);
    }
}
