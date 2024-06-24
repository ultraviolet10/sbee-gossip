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
            <DrawerContent className="z-30 bg-white flex flex-col rounded-t-[10px] h-full w-[300px] mt-24 fixed bottom-0 right-0">
                <DrawerHeader className="text-left bg-white">
                    <DrawerTitle className="font-comic text-[20px]">Options</DrawerTitle>
                    {/* page navigation links */}
                </DrawerHeader>
                <div className="flex flex-col items-start justify-start space-y-4 px-4">
                    <button
                        className={clsx({
                            "flex items-center justify-center w-[100px] h-12 bg-sbee border-[#603309] border-[2px] rounded-xl shadow-connect":
                                !walletAddress,
                            "flex flex-row items-center justify-center w-[170px] h-12 bg-[#FFC70F] border-[#FFC70F] border-[2px] rounded-xl shadow-connect space-x-2":
                                walletAddress,
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
                            className={clsx({
                                "font-comic font-bold text-white text-[20px]": pathname === Routes.Home,
                                "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home,
                            })}
                        >
                            SBEE Ecosystem
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
                        <span
                            className={clsx({
                                "font-comic font-bold text-white text-[20px]": pathname === Routes.Home,
                                "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home,
                            })}
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
                        <span
                            className={clsx({
                                "font-comic font-bold text-white text-[20px]": pathname === Routes.Home,
                                "font-comic font-bold text-[#603309] text-[20px]": pathname !== Routes.Home,
                            })}
                        >
                            Post Anonymous Tips
                        </span>
                    </button>
                </div>
            </DrawerContent>
        </Drawer>
    )
}

export default OptionsDrawer
