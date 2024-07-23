import {
  createUseReadContract,
  createUseSimulateContract,
  createUseWriteContract,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Gossip
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const gossipAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'semaphoreAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'groupId',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'identityCommitment', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'joinGroup',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'semaphore',
    outputs: [
      { name: '', internalType: 'contract ISemaphore', type: 'address' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'merkleTreeDepth', internalType: 'uint256', type: 'uint256' },
      { name: 'merkleTreeRoot', internalType: 'uint256', type: 'uint256' },
      { name: 'nullifier', internalType: 'uint256', type: 'uint256' },
      { name: 'gossip', internalType: 'uint256', type: 'uint256' },
      { name: 'points', internalType: 'uint256[8]', type: 'uint256[8]' },
    ],
    name: 'sendGossip',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gossipAbi}__
 */
export const useReadGossip = /*#__PURE__*/ createUseReadContract({
  abi: gossipAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"groupId"`
 */
export const useReadGossipGroupId = /*#__PURE__*/ createUseReadContract({
  abi: gossipAbi,
  functionName: 'groupId',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"semaphore"`
 */
export const useReadGossipSemaphore = /*#__PURE__*/ createUseReadContract({
  abi: gossipAbi,
  functionName: 'semaphore',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gossipAbi}__
 */
export const useWriteGossip = /*#__PURE__*/ createUseWriteContract({
  abi: gossipAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"joinGroup"`
 */
export const useWriteGossipJoinGroup = /*#__PURE__*/ createUseWriteContract({
  abi: gossipAbi,
  functionName: 'joinGroup',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"sendGossip"`
 */
export const useWriteGossipSendGossip = /*#__PURE__*/ createUseWriteContract({
  abi: gossipAbi,
  functionName: 'sendGossip',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gossipAbi}__
 */
export const useSimulateGossip = /*#__PURE__*/ createUseSimulateContract({
  abi: gossipAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"joinGroup"`
 */
export const useSimulateGossipJoinGroup =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gossipAbi,
    functionName: 'joinGroup',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link gossipAbi}__ and `functionName` set to `"sendGossip"`
 */
export const useSimulateGossipSendGossip =
  /*#__PURE__*/ createUseSimulateContract({
    abi: gossipAbi,
    functionName: 'sendGossip',
  })
