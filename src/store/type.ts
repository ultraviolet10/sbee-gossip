import { BrowserProvider } from "ethers"

export interface StoreState {
  walletAddress?: string
  provider?: BrowserProvider
  // semaphore identity stuff

  setWalletAddress: (address: string) => void
  setProvider: (provider: BrowserProvider) => void
}
