import { BrowserProvider } from "ethers"

export interface StoreState {
  walletAddress?: string // wallet user has connected with
  provider?: BrowserProvider // provider instance from browser wallet
  semaphoreIdentity?: bigint // generated identity from semaphore, used for anonymous posting + voting

  setWalletAddress: (address: string) => void
  setProvider: (provider: BrowserProvider) => void
  setSemaphoreIdentity: (id: bigint) => void
}
