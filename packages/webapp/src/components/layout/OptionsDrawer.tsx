import React from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useRouter } from "next/router"
import clsx from "clsx"

import { Drawer, DrawerContent, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/Drawer"
import useStore from "@/store/store"
import { Routes } from "@/types/enums"
import { shortenAddress } from "@/utils/tool"

interface OptionsDrawerProps {}

// renders only when in a mobile screen
const OptionsDrawer: React.FC<OptionsDrawerProps> = () => {
    const router = useRouter()
    const pathname = usePathname()
    const { walletAddress } = useStore()

    return (
        <Drawer>
            <DrawerTrigger>
                <button className="flex items-center justify-center w-6 h-6 bg-white rounded-lg border-[1px] border-gray-600">
                    <Image src={"/img/list.svg"} alt={"list"} width={15} height={15} />
                </button>
            </DrawerTrigger>
            <DrawerContent className="z-30 bg-sbee flex flex-col rounded-t-[10px] h-full w-[300px] mt-24 fixed bottom-0 right-0">
                <DrawerHeader className="text-left bg-white">
                    <DrawerTitle className="font-comic text-[30px] text-[#603309]">Options</DrawerTitle>
                    {/* page navigation links */}
                </DrawerHeader>
                <div className="flex flex-col items-start justify-start space-y-4 px-4">
                    <button
                        className="font-comic font-bold text-[#603309] text-[20px]"
                        onClick={() => {
                            // navigate to connect page
                            router.push(Routes.Connect)
                        }}
                    >
                        {walletAddress ? shortenAddress(walletAddress) : "connect wallet"}
                    </button>
                    <button
                        className={clsx({
                            "hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3":
                                pathname !== Routes.Home,
                            "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3":
                                pathname === Routes.Home,
                        })}
                    >
                        <span className="font-comic font-bold text-[#603309] text-[20px]">SBEE Ecosystem</span>
                    </button>
                    <button
                        className={clsx({
                            "hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3":
                                pathname !== Routes.Home,
                            "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3":
                                pathname === Routes.Home,
                        })}
                    >
                        <span
                            className="font-comic font-bold text-[#603309] text-[20px]"
                            onClick={() => {
                                // navigate to feed page
                                router.push(Routes.Feed)
                            }}
                        >
                            Feed
                        </span>
                    </button>
                    <button
                        className={clsx({
                            "hover:underline hover:underline-offset-2 hover:decoration-[#603309] hover:decoration-3":
                                pathname !== Routes.Home,
                            "hover:underline hover:underline-offset-2 hover:decoration-white hover:decoration-3":
                                pathname === Routes.Home,
                        })}
                    >
                        {/* if no wallet connected, take them to the connect wallet page */}
                        <span className="font-comic font-bold text-[#603309] text-[20px]">Post Anonymous Tips</span>
                    </button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default OptionsDrawer
