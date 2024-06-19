import { useCallback } from "react"
import { ethers, JsonRpcProvider, Wallet } from "ethers"

import detectEthereumProvider from "@metamask/detect-provider"

import useStore from "@/store/store"

export const useConfigWallet = () => {
  const { setWalletAddress, setProvider } = useStore()

  const connectWallet = useCallback(async () => {
    let signer = null
    let provider
    
    const metamaskProvider = await detectEthereumProvider()

    const defaultNetwork = process.env.NEXT_PUBLIC_DEFAULT_NETWORK as string
    const ethereumPrivateKey = process.env.NEXT_PUBLIC_TEST_PVT_KEY as string

    if (defaultNetwork !== "localhost") {
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
    } else {
      /**
       * if node env is dev-1, setup ethers instance using first private key of anvil 
       * "test .... junk" mnemonic. instantiate signer and provider from there. 
       * don't bother w the metamask stuff (yet).
       */
      const provider = new JsonRpcProvider("http://127.0.0.1:8545")
      const signer = new Wallet(ethereumPrivateKey, provider)

      setWalletAddress(signer.address)
      setProvider(provider)
    }
    

    return false
  }, [setProvider, setWalletAddress])

  const signMessage = useCallback(async (message: string): Promise<string> => {
    const metamaskProvider = await detectEthereumProvider()
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
    signMessage,
  }
}
