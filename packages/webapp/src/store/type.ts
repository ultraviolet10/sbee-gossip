import { BrowserProvider, JsonRpcProvider } from "ethers"

export interface StoreState {
  walletAddress?: string // wallet user has connected with
  provider?: BrowserProvider | JsonRpcProvider // provider instance from browser wallet
  semaphoreIdentity?: bigint // generated identity from semaphore, used for anonymous posting + voting

  setWalletAddress: (address: string) => void
  setProvider: (provider: BrowserProvider | JsonRpcProvider) => void
  setSemaphoreIdentity: (id: bigint) => void
}
