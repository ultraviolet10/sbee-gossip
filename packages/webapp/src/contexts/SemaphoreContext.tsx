/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { createContext, ReactNode, useCallback, useContext, useEffect, useMemo } from "react"
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
import { toast } from "sonner"

import { gossipAbi } from "@/generated"
import useStore from "@/store/store"
import { AnonVote } from "@/types/enums"

export type SemaphoreContextType = {
    users: string[]
    gossips: string[]
    refreshUsers: () => Promise<void>
    addUser: (user: string) => void
    refreshGossip: () => Promise<void>
    addGossip: (gossip: string) => void
    addUserToGroup: (commitment: bigint) => Promise<boolean>
    submitGossip: (identity: Identity, gossipContent: string) => Promise<boolean>
    performVote: (choice: AnonVote) => Promise<boolean>
    // @todo vote functions
}

const SemaphoreContext = createContext<SemaphoreContextType | null>(null)
// @todo extend SemaphoreContext -> GossipContext?
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
    const { users, gossips, addGossip, addUser, setUsers, setGossip } = useStore()

    // .•°:°.´+˚.*°.˚:*.´•*.+°.•°: MEMOIZED CONTRACT INSTANCES ´*.´•*.•°.•°:°.´:•˚°.*°.˚:*.´+°.•
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
    }, [groupId, semaphoreContract, setUsers])

    const refreshGossip = useCallback(async (): Promise<void> => {
        const proofs = await semaphoreContract.getGroupValidatedProofs(groupId)
        setGossip(proofs.map(({ message }: any) => decodeBytes32String(toBeHex(message, 32))))
    }, [groupId, semaphoreContract, setGossip])

    /**
     * in order to vote, we need to send the `feedbackId` in as a parameter
     * currently we can only get `feedbackId` from the FeedbackSent event
     * that is to be emitted after someone submits gossip.
     *
     * Currently we all get all validated proofs from the event tracker
     * `getGroupValidatedProofs` which tracks the `ProofValidated` events.
     *
     * option 1: write a new callback fn that tracks the `FeedbackSent`
     * events, holds all the `feedbackId`-s. use that to refer to the feedbacks / gossips.
     *
     * option 2: ?
     */
    // const getGossipIds = useCallback(async () => {
    //     const gossipSentEvents = await getEvents(semaphoreContract.contract, "FeedbackSent", groupId)
    // }, [])

    const performVote = useCallback(async (choice: AnonVote) => {
        try {
            // perform vote, once tx confirms, show toast(s)
            // show success tx leading out to etherscan 
            // export to socials?
            if (choice === AnonVote.Believe) toast.success(`You voted in support!`)
            else toast.info(`You voted against!`)

            return true
        } catch (error) {
            toast.error("Something went wrong")
            return false
        }
    }, [])

    /**
     * Submits a tx to the `joinGroup` method on the `Gossip`
     * contract with the `identityCommitment` as a parameter.
     *
     * Once the transaction confirms, it performs a local update to
     * the `_users` state variable (UX), and then replaces it with
     * the contract read of the user identity commitments.
     *
     * @param idCommitment deterministic identity commitment of the user
     * ref: https://docs.semaphore.pse.dev/guides/identities#create-deterministic-identities
     */

    const addUserToGroup = useCallback(
        async (idCommitment: bigint) => {
            try {
                // @todo need to inform user about this tx
                const addUserTx = await gossipContract.joinGroup(idCommitment)
                const waitConfirm: TransactionReceipt = await addUserTx.wait()
                if (waitConfirm.status === 1) {
                    console.log({ waitConfirm })
                    // update state variable
                    addUser(idCommitment.toString())
                    // inform user that their anon identity is onchain (tyty semaphore)
                    toast.success("Anonymous identity recorded successfully!")

                    return true
                }
                return false
            } catch (error) {
                console.error(error)
                return false
            }
        },
        [addUser, gossipContract]
    )

    /**
     * Submits a tx to the `sendGossip` method on the `Gossip`
     * contract.
     *
     * @param identity Identity generated by signing a message with the wallet pvt key.
     * @param gossipContent message submitted by the user, to be submitted anonymously.
     */
    const submitGossip = useCallback(
        async (identity: Identity, gossipContent: string) => {
            try {
                const group = new Group(
                    users.indexOf(identity.commitment.toString()) === -1
                        ? [...users, identity.commitment.toString()]
                        : users
                )
                const message = encodeBytes32String(gossipContent)

                // generate semaphore proof
                const { points, merkleTreeDepth, merkleTreeRoot, nullifier } = await generateProof(
                    identity,
                    group,
                    message,
                    groupId
                )

                // submit tx to gossip contract
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
                    console.log({ submitTxConf })
                    addGossip(gossipContent)
                    refreshGossip()

                    return true
                }
                return false
            } catch (error) {
                console.error(error)
                return false
            }
        },
        [addGossip, gossipContract, groupId, refreshGossip, users]
    )

    useEffect(() => {
        refreshUsers()
        refreshGossip()
    }, [refreshGossip, refreshUsers])

    return (
        <SemaphoreContext.Provider
            value={{
                users,
                gossips,
                refreshUsers,
                addUser,
                refreshGossip,
                addGossip,
                addUserToGroup,
                submitGossip,
                performVote,
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
