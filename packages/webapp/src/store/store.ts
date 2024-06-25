import { BrowserProvider, JsonRpcProvider } from "ethers"
import { create } from "zustand"

import { Identity } from "@semaphore-protocol/core"

import { StoreState } from "./type"

const useStore = create<StoreState>((set) => ({
    walletAddress: undefined,
    provider: undefined,
    semaphoreIdentity: undefined,
    gossips: [],

    setWalletAddress: (address: string) => set(() => ({ walletAddress: address })),
    setProvider: (provider: BrowserProvider | JsonRpcProvider) => set(() => ({ provider })),
    setSemaphoreIdentity: (iden: Identity) => set(() => ({ semaphoreIdentity: iden })),
    addGossip: (gossip: string) => set((state) => ({ gossips: [...state.gossips, gossip] })),
}))

export default useStore
