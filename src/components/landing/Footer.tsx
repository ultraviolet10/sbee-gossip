import Image from "next/image"
import React from "react"

interface FooterProps {}

const Footer: React.FC<FooterProps> = () => {
  return (
    <footer className="flex flex-row items-center justify-between w-full h-[150px] px-6">
      {/* <Image
        src={"/img/landing-banner.svg"}
        alt={"landing"}
        className="absolute bottom-0 right-0"
        fill={true}
      /> */}

      <span className="text-black text-[15px] font-comic font-bold">
        © 2024 SharkBee Coin. All Rights Reserved.
      </span>
      <div className="flex flex-row items-center justify-center space-x-4">
        <Image
          src={"/img/discord-icn.svg"}
          alt={"discord"}
          width={25}
          height={25}
        ></Image>
        <Image
          src={"/img/x-icn.svg"}
          alt={"discord"}
          width={25}
          height={25}
        ></Image>
        <Image
          src={"/img/telegram-icn.svg"}
          alt={"discord"}
          width={25}
          height={25}
        ></Image>
      </div>
    </footer>
  )
}

export default Footer
