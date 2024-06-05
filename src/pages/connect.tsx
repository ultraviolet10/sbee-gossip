import Footer from "@/components/landing/Footer"
import Header from "@/components/landing/Header"
import { NextPage } from "next"
import Image from "next/image"
import React, { useCallback } from "react"
import { useConfigWallet } from "../hooks/useConfigWallet"
import { Identity } from "@semaphore-protocol/core"
// import { toast } from "sonner"

const ConnectPage: NextPage = () => {
  const { connectWallet, signMessage } = useConfigWallet()

  const handleConnectClick = useCallback(async () => {
    // connect wallet
    const connection = await connectWallet()

    // sign message
    let msgSignature: string | undefined = undefined
    if (connection) {
      console.log("")
      msgSignature = await signMessage("truths galore")
    } else {
      console.log("sign issue")
    }

    if(msgSignature) {
      const identity = new Identity(msgSignature)
    }
  }, [])
  return (
    <div className="flex flex-col w-full items h-screen px-6 bg-sbee">
      <Header />
      <div className="flex flex-col items-center justify-center space-y-4">
        <Image
          src={"/img/honeypot.svg"}
          width={400}
          height={400}
          alt={"honeypot"}
        ></Image>
        <span className="text-[#60330a] text-[20px] font-comic font-bold">
          Connect wallet & post honest truths
        </span>

        <button className=""></button>
        <button
          className="bg-[#ffc70f] w-[200px] h-12 border-[#f59f00] border-[2px] font-comic text-[20px] font-bold rounded-xl"
          onClick={handleConnectClick}
        >
          Connect Wallet
        </button>
      </div>
      <Footer />
    </div>
  )
}

export default ConnectPage
