/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo, useState } from "react"
import {
    Contract,
    decodeBytes32String,
    encodeBytes32String,
    JsonRpcProvider,
    toBeHex,
    TransactionReceipt,
    Wallet,
} from "ethers"

import { generateProof, Group, Identity } from "@semaphore-protocol/core"
import { SemaphoreEthers } from "@semaphore-protocol/data"

import { gossipAbi } from "@/generated"

export type SemaphoreContextType = {
    _users: string[]
    _gossip: string[]
    refreshUsers: () => Promise<void>
    addUser: (user: string) => void
    refreshGossip: () => Promise<void>
    addGossip: (gossip: string) => void
    addUserToGroup: (commitment: string) => Promise<boolean>
    submitGossip: (identity: Identity, gossipContent: string) => Promise<boolean>
}

const SemaphoreContext = createContext<SemaphoreContextType | null>(null)

interface ProviderProps {
    children: ReactNode
}

const ethereumNetwork =
    process.env.NEXT_PUBLIC_DEFAULT_NETWORK === "localhost"
        ? "http://127.0.0.1:8545"
        : process.env.NEXT_PUBLIC_DEFAULT_NETWORK

const ethereumPrivateKey = process.env.NEXT_PUBLIC_TEST_PVT_KEY as string

const provider = new JsonRpcProvider("http://127.0.0.1:8545")
const signer = new Wallet(ethereumPrivateKey, provider)
const gossipAddress = process.env.NEXT_PUBLIC_GOSSIP_CONTRACT_ADDRESS as string

export const SemaphoreContextProvider: React.FC<ProviderProps> = ({ children }) => {
    const [_users, setUsers] = useState<string[]>([])
    const [_gossip, setGossip] = useState<string[]>([])

    // @todo use zustand instead of useState? 

    // Semaphore contract instance
    const semaphoreContract = useMemo(() => {
        return new SemaphoreEthers(ethereumNetwork, {
            address: process.env.NEXT_PUBLIC_SEMAPHORE_CONTRACT_ADDRESS,
        })
    }, [])

    // Gossip contract instance
    const gossipContract = useMemo(() => {
        return new Contract(gossipAddress, gossipAbi, signer)
    }, [])

    // current onchain group ID
    const groupId = process.env.NEXT_PUBLIC_GROUP_ID as string

    const refreshUsers = useCallback(async (): Promise<void> => {
        const members = await semaphoreContract.getGroupMembers(groupId)
        setUsers(members.map((member) => member.toString()))
    }, [groupId, semaphoreContract])

    const addUser = useCallback(
        (user: any) => {
            setUsers([..._users, user])
        },
        [_users]
    )

    const refreshGossip = useCallback(async (): Promise<void> => {
        const proofs = await semaphoreContract.getGroupValidatedProofs(groupId)
        setGossip(proofs.map(({ message }: any) => decodeBytes32String(toBeHex(message, 32))))
    }, [groupId, semaphoreContract])

    const addGossip = useCallback(
        (gossip: string) => {
            setGossip([..._gossip, gossip])
        },
        [_gossip]
    )

    /**
     * Submits a tx to the `joinGroup` method on the `Gossip` 
     * contract with the `identityCommitment` as a parameter.
     *
     * Once the transaction confirms, it performs a local update to
     * the `_users` state variable (UX), and then replaces it with
     * the contract read of the user identity commitments.
     * 
     * @param commitment determniistic identity commitment of the user
     */

    const addUserToGroup = useCallback(
        async (commitment: string) => {
            const addUserTx = await gossipContract.joinGroup(commitment)
            const waitConfirm: TransactionReceipt = await addUserTx.wait()
            if (waitConfirm.status === 1) {
                // update state variable
                addUser(commitment)
                // check that contract is pulling the same data?
                refreshUsers()

                return true
            }
            return false
        },
        [addUser, gossipContract, refreshUsers]
    )

    /**
     * Submits a tx to the `sendGossip` method on the `Gossip`
     * contract. 
     * 
     * @param identity Identity generated by signing a message with the pvt key.
     * @param gossipContent message submitted by the user to be submitted anonymously.
     */
    const submitGossip = useCallback(async (identity: Identity, gossipContent: string) => {
        const group = new Group(_users) // has to be most updated version, containing the current identity commitment
        const message = encodeBytes32String(gossipContent)

        const { points, merkleTreeDepth, merkleTreeRoot, nullifier } = await generateProof(
            identity,
            group,
            message,
            groupId
        )

        const submitGossipTx = await gossipContract.sendGossip(
            merkleTreeDepth,
            merkleTreeRoot,
            nullifier,
            message,
            points
        )
        const submitTxConf: TransactionReceipt = await submitGossipTx.wait()
        if (submitTxConf.status === 1) {
            // local updates
            addGossip(gossipContent)
            refreshGossip()
            
            return true
        }
        return false
    }, [_users, addGossip, gossipContract, groupId, refreshGossip])

    useEffect(() => {
        refreshUsers()
        refreshGossip()
    }, [refreshGossip, refreshUsers])

    return (
        <SemaphoreContext.Provider
            value={{
                _users,
                _gossip,
                refreshUsers,
                addUser,
                refreshGossip,
                addGossip,
                addUserToGroup,
                submitGossip,
            }}
        >
            {children}
        </SemaphoreContext.Provider>
    )
}

export const useSemaphoreContext = () => {
    const context = useContext(SemaphoreContext)
    if (context === null) {
        throw new Error("SemaphoreContext must be used within a SemaphoreContextProvider")
    }
    return context
}
