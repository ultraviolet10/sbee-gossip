import { BrowserProvider, JsonRpcProvider } from "ethers"

import { Identity } from "@semaphore-protocol/core"

export interface StoreState {
    walletAddress?: string // wallet user has connected with
    provider?: BrowserProvider | JsonRpcProvider // provider instance from browser wallet
    semaphoreIdentity?: Identity // generated identity from semaphore, used for anonymous posting + voting
    gossips: string[] // array of gossips
    users: string[] // list of identity commitments in a group

    setWalletAddress: (address: string) => void
    setProvider: (provider: BrowserProvider | JsonRpcProvider) => void
    setSemaphoreIdentity: (id: Identity) => void
    addGossip: (gossip: string) => void // function to add gossip statement to the array
    addUser: (user: string) => void // function to add a user to the array
    setUsers: (members: string[]) => void // function to set the array of users
    setGossip: (proofs: any[]) => void // function to set the array of gossips (data type)
}
