import React from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import clsx from "clsx"

import useStore from "@/store/store"
import { shortenAddress } from "@/utils/tool"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter()

  const { walletAddress } = useStore()

  return (
    <header className="flex flex-row items-center justify-between w-full bg-transparent">
      <Image src="/img/sbee-logo.svg" alt={"logo"} height={150} width={150} onClick={() => {router.push("/")}} />

      {/* navigation button system */}
      <div className="flex flex-row items-center justify-center space-x-10">
        <button className="hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-2">
          <span className="font-comic font-bold text-white text-[20px]">
            SBEE Ecosystem
          </span>
        </button>
        <button className="hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-2">
          <span
            className="font-comic font-bold text-white text-[20px]"
            onClick={() => {
              // navigate to feed page
              router.push("/feed")
            }}
          >
            Feed
          </span>
        </button>
        <button className="hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-2">
          {/* if no wallet connected, take them to the connect wallet page */}
          <span className="font-comic font-bold text-white text-[20px]">
            Post Anonymous Tips
          </span>
        </button>
      </div>

      <button
        className={clsx({
          "flex items-center justify-center w-[100px] h-12 bg-sbee border-[#603309] border-[2px] rounded-xl": !walletAddress, 
          "flex flex-row items-center justify-center w-[170px] h-12 bg-[#FFC70F] border-[#FFC70F] border-[2px] rounded-xl space-x-2": walletAddress
        })}
        onClick={() => {
          // navigate to connect page
          router.push("/connect")
        }}
      >
        <span className="font-comic font-bold text-[#603309] text-[20px]">
          {walletAddress ? shortenAddress(walletAddress) : "connect"}
        </span>
        {walletAddress && <Image src={"/img/wallet-bee.svg"} alt={"beeee"} width={35} height={35} />}
      </button>
    </header>
  )
}

export default Header