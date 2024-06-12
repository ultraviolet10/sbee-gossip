import React from "react"
import { isMobile } from "react-device-detect"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import clsx from "clsx"

import OptionsDrawer from "./OptionsDrawer"

import useStore from "@/store/store"
import { Routes } from "@/types/enums"
import { shortenAddress } from "@/utils/tool"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter()
  const pathname = usePathname()

  const { walletAddress } = useStore()

  return (
    <header className="flex flex-row items-center justify-between w-full bg-transparent">
      <Image className="hover:cursor-pointer" src="/img/sbee-logo.svg" alt={"logo"} height={150} width={150} onClick={() => {router.push(Routes.Home)}} />

      {/* navigation button system */}
      {!isMobile && <div className="flex flex-row items-center justify-center space-x-10">
        <button className={clsx({"hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3": pathname !== Routes.Home, "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3": pathname === Routes.Home})}>
          <span className={clsx({"font-comic font-bold text-white text-[20px]": pathname === Routes.Home, "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home})}>
            SBEE Ecosystem
          </span>
        </button>
        <button className={clsx({"hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3": pathname !== Routes.Home, "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3": pathname === Routes.Home})}>
          <span
            className={clsx({"font-comic font-bold text-white text-[20px]": pathname === Routes.Home, "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home})}
            onClick={() => {
              // navigate to feed page
              router.push(Routes.Feed)
            }}
          >
            Feed
          </span>
        </button>
        <button className={clsx({"hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3": pathname !== Routes.Home, "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3": pathname === Routes.Home})}>
          {/* if no wallet connected, take them to the connect wallet page */}
          <span className={clsx({"font-comic font-bold text-white text-[20px]": pathname === Routes.Home, "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home})}>
            Post Anonymous Tips
          </span>
        </button>
      </div>}

      {/* address button */}
      {!isMobile && <button
        className={clsx({
          "flex items-center justify-center w-[100px] h-12 bg-sbee border-[#603309] border-[2px] rounded-xl shadow-connect": !walletAddress, 
          "flex flex-row items-center justify-center w-[170px] h-12 bg-[#FFC70F] border-[#FFC70F] border-[2px] rounded-xl shadow-connect space-x-2": walletAddress
        })}
        onClick={() => {
          // navigate to connect page
          router.push(Routes.Connect)
        }}
      >
        <span className="font-comic font-bold text-[#603309] text-[20px]">
          {walletAddress ? shortenAddress(walletAddress) : "connect"}
        </span>
        {walletAddress && <Image src={"/img/wallet-bee.svg"} alt={"beeee"} width={35} height={35} />}
      </button>}

      {isMobile && <OptionsDrawer />}
    </header>
  )
}

export default Header
