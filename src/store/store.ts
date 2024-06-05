import { create } from "zustand"
import { StoreState } from "./type"
import { BrowserProvider } from "ethers"

const useStore = create<StoreState>((set) => ({
  walletAddress: undefined,
  provider: undefined,

  setWalletAddress: (address: string) =>
    set(() => ({ walletAddress: address })),
  setProvider: (provider: BrowserProvider) => set(() => ({ provider })),
}))

export default useStore
