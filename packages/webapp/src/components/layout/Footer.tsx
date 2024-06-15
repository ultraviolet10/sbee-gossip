import React from "react"
import Image from "next/image"

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer
      className="flex flex-row items-center justify-between w-full h-[100px] px-6"
      // style={{ backgroundImage: 'url(/img/honey-wave.svg)', backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <span className="text-black text-[15px] font-comic font-bold">
        © 2024 SharkBee Coin. All Rights Reserved.
      </span>
      <div className="flex flex-row items-center justify-center space-x-4">
        <Image
          src={"/img/discord-icn.svg"}
          alt={"discord"}
          width={25}
          height={25}
        />
        <Image
          src={"/img/x-icn.svg"}
          alt={"x"}
          width={25}
          height={25}
        />
        <Image
          src={"/img/telegram-icn.svg"}
          alt={"telegram"}
          width={25}
          height={25}
        />
      </div>
    </footer>
  )
}

export default Footer
