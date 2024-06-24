import { BrowserProvider, JsonRpcProvider } from "ethers"
import { create } from "zustand"

import { Identity } from "@semaphore-protocol/core"

import { StoreState } from "./type"

const useStore = create<StoreState>((set) => ({
    walletAddress: undefined,
    provider: undefined,
    semaphoreIdentity: undefined,

    setWalletAddress: (address: string) => set(() => ({ walletAddress: address })),
    setProvider: (provider: BrowserProvider | JsonRpcProvider) => set(() => ({ provider })),
    setSemaphoreIdentity: (iden: Identity) => set(() => ({ semaphoreIdentity: iden })),
}))

export default useStore
