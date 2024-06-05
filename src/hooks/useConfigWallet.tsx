import { ethers } from "ethers"
import detectEthereumProvider from "@metamask/detect-provider"
import useStore from "@/store/store"
import { useCallback } from "react"

export const useConfigWallet = () => {
  const { setWalletAddress, setProvider, provider } = useStore()

  const connectWallet = useCallback(async () => {
    let signer = null
    let provider

    const metamaskProvider = await detectEthereumProvider()

    if (!(metamaskProvider && window.ethereum)) {
      // If MetaMask is not installed, we use the default provider,
      // which is backed by a variety of third-party services (such
      // as INFURA). They do not have private keys installed,
      // so they only have read-only access
      console.log("MetaMask not installed; using read-only defaults")
      provider = ethers.getDefaultProvider()
    } else {
      // Connect to the MetaMask EIP-1193 object. This is a standard
      // protocol that allows Ethers access to make all read-only
      // requests through MetaMask.
      provider = new ethers.BrowserProvider(window.ethereum)

      // It also provides an opportunity to request access to write
      // operations, which will be performed by the private key
      // that MetaMask manages for the user.
      signer = await provider.getSigner()

      // store address and provider in global store
      setWalletAddress(signer.address)
      setProvider(provider)

      return true
    }

    return false
  }, [])

  const signMessage = useCallback(async (message: string): Promise<string> => {
    const metamaskProvider = await detectEthereumProvider()
    console.log("sign")
    let signature = ""
    if (metamaskProvider && window.ethereum) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const signer = await provider.getSigner()
      signature = await signer.signMessage(message)
    }

    return signature
  }, [])

  return {
    connectWallet,
    signMessage
  }
}
