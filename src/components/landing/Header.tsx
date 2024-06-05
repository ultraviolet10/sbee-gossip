import Image from "next/image"
import { useRouter } from "next/router"
import React, { useCallback } from "react"

interface HeaderProps {}

const Header: React.FC<HeaderProps> = () => {
  const router = useRouter()

  const handleConnectClick = useCallback(() => {
    // navigate to /connect
    router.push("/connect")
  }, [])
  return (
    <header className="flex flex-row items-center justify-between w-full">
      <Image src="/img/sbee-logo.svg" alt={"logo"} height={200} width={200} />

      {/* navigation button system */}
      <div className="flex flex-row items-center justify-center space-x-10">
        <button className="hover:underline hover:underline-offset-2">
          <span className="font-comic font-bold text-black text-[20px]">
            SBEE Ecosystem
          </span>
        </button>
        <button className="hover:underline hover:underline-offset-2">
          <span className="font-comic font-bold text-black text-[20px]">
            About Us
          </span>
        </button>
        <button className="hover:underline hover:underline-offset-2">
          {/* if no wallet connected, take them to the connect wallet page */}
          <span className="font-comic font-bold text-black text-[20px]">
            Post Anonymous Tips
          </span>
        </button>
      </div>

      <button
        className="flex items-center justify-center w-[100px] h-12 bg-sbee border-[#603309] border-[2px] rounded-xl"
        onClick={handleConnectClick}
      >
        <span className="font-comic font-bold text-[#603309] text-[20px]">
          connect
        </span>
      </button>
    </header>
  )
}

export default Header
