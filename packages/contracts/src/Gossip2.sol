// SPDX-License-Identifier: MIT
pragma solidity ^0.8.23;

import {ISemaphore} from "@semaphore-protocol/contracts/interfaces/ISemaphore.sol";

contract Gossip2 {
    ISemaphore public semaphore;

    /// @notice Group ID for the Semaphore group
    uint256 public groupId;

    /// @notice Counter for the next feedback ID
    uint256 public nextFeedbackId;

    /// @notice Structure to store feedback details
    struct FeedbackStruct {
        // uint256 gossip;            ///< The feedback content
        uint256 trueVotes;
        ///< Number of true votes
        uint256 falseVotes;
        ///< Number of false votes
        uint256 merkleRoot;
        ///< Lazy IMT root of the group
        uint256 merkleTreeDepth;
        ///< Depth of the Lazy IMT
        bool exists;
        ///< Indicates if the feedback exists
        mapping(uint256 => bool) nullifiers;
    }
    ///< Mapping to track used nullifiers to prevent double voting

    /// @notice Mapping of feedback ID to feedback details
    mapping(uint256 => FeedbackStruct) public feedbacks;

    /// @notice Event emitted when a new group is created
    /// @param groupId ID of the created group
    event GroupCreated(uint256 groupId);

    /// @notice Event emitted when new feedback is sent
    /// @param groupId ID of the group
    /// @param feedbackId ID of the feedback
    event FeedbackSent(uint256 groupId, uint256 feedbackId);

    /// @notice Event emitted when a vote is cast on feedback
    /// @param feedbackId ID of the feedback
    /// @param vote True if the vote is positive, false otherwise
    /// @param trueVotes Total number of true votes after the vote
    /// @param falseVotes Total number of false votes after the vote
    event Voted(uint256 feedbackId, bool vote, uint256 trueVotes, uint256 falseVotes);

    /// @notice Constructor to initialize the contract with Semaphore protocol address
    /// @param semaphoreAddress Address of the Semaphore protocol contract
    constructor(address semaphoreAddress) {
        semaphore = ISemaphore(semaphoreAddress);
        groupId = semaphore.createGroup();
    }

    /// @notice Function to join the Semaphore group
    /// @param identityCommitment Identity commitment of the new member
    function joinGroup(uint256 identityCommitment) external {
        semaphore.addMember(groupId, identityCommitment);
    }

    /// @notice Function to send anonymous feedback
    /// @param merkleTreeDepth Depth of the Lazy IMT
    /// @param merkleTreeRoot Root of the Lazy IMT
    /// @param nullifier Unique nullifier for the feedback
    /// @param gossip Content of the feedback
    /// @param points Zero-knowledge proof points
    function sendGossip(
        uint256 merkleTreeDepth,
        uint256 merkleTreeRoot,
        uint256 nullifier,
        uint256 gossip,
        uint256[8] calldata points
    ) external {
        ISemaphore.SemaphoreProof memory proof =
            ISemaphore.SemaphoreProof(merkleTreeDepth, merkleTreeRoot, nullifier, gossip, groupId, points);

        semaphore.validateProof(groupId, proof);

        uint256 feedbackId = nextFeedbackId++;
        FeedbackStruct storage newFeedback = feedbacks[feedbackId];
        // newFeedback.gossip = gossip; // doesn't this kill anonymity?
        newFeedback.merkleRoot = merkleTreeRoot;
        newFeedback.merkleTreeDepth = merkleTreeDepth;
        newFeedback.exists = true;

        emit FeedbackSent(groupId, feedbackId); // used for indexing and fetching all feedback
    }

    /// @notice Function to vote on feedback
    /// @param feedbackId ID of the feedback to vote on
    /// @param opinion True if the vote is positive, false otherwise
    /// @param nullifierHash Unique hash to prevent double voting
    /// @param semaphoreProof Zero-knowledge proof points for the vote
    function vote(uint256 feedbackId, bool opinion, uint256 nullifierHash, uint256[8] calldata semaphoreProof)
        external
    {
        FeedbackStruct storage fb = feedbacks[feedbackId];
        require(fb.exists, "Feedback does not exist");
        require(!fb.nullifiers[nullifierHash], "Duplicate nullifier");

        // does this work? h0w / why not?
        ISemaphore.SemaphoreProof memory proof = ISemaphore.SemaphoreProof(
            fb.merkleTreeDepth,
            fb.merkleRoot,
            nullifierHash,
            uint256(keccak256(abi.encode(opinion))),
            feedbackId,
            semaphoreProof
        );

        semaphore.validateProof(groupId, proof);

        fb.nullifiers[nullifierHash] = true;

        if (opinion) {
            fb.trueVotes += 1;
        } else {
            fb.falseVotes += 1;
        }

        emit Voted(feedbackId, opinion, fb.trueVotes, fb.falseVotes);
    }
}
