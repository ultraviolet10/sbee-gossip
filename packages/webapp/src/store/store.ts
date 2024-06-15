import { BrowserProvider } from "ethers"
import { create } from "zustand"

import { StoreState } from "./type"

const useStore = create<StoreState>((set) => ({
  walletAddress: undefined,
  provider: undefined,
  semaphoreIdentity: undefined,

  setWalletAddress: (address: string) =>
    set(() => ({ walletAddress: address })),
  setProvider: (provider: BrowserProvider) => set(() => ({ provider })),
  setSemaphoreIdentity: (id: bigint) =>
    set(() => ({ semaphoreIdentity: id })),
}))

export default useStore
