import React, { useCallback, useState } from "react"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Textarea } from "@/components/ui/Textarea"
import useStore from "@/store/store"

interface NewPostModalProps {}

const NewPostModal: React.FC<NewPostModalProps> = () => {
    const [gossipContent, setGossipContent] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)
    const { addGossip } = useStore()

    const handleGossipInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGossipContent(event.target.value)
    }

    const handleGossipSubmit = useCallback(async () => {
        // if (_users && _users.length < 2) {
        //   console.log("No anonymity in a group of one!")
        //   return
        // }
        if (gossipContent) {
            addGossip(gossipContent)
            setGossipContent(undefined)

            setOpen(false)
        }
    }, [addGossip, gossipContent])

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="w-[170px] h-12 bg-sbee border-[#603309] border-[2px] rounded-xl shadow-connect font-comic font-bold text-[20px] text-[#603309]">
                Create Post
            </DialogTrigger>
            <DialogContent className="flex flex-col bg-sbee border-gray-800 items-start justify-center w-full">
                <DialogHeader>
                    <DialogTitle className="text-[#603309] font-comic text-[20px]">New Post</DialogTitle>
                </DialogHeader>
                <Textarea
                    id="link"
                    placeholder={`Share with us anonymously!! \n\nSpeak your mind..`}
                    onChange={handleGossipInput}
                    className="h-32 font-comic text-black placeholder:text-[20px] placeholder:text-gray-500"
                />
                {/* <div className="h-[1px] w-full bg-black"></div> */}
                <div className="flex w-full justify-end">
                    <button
                        className="flex items-center justify-center w-[100px] h-8 bg-[#FFC70F] rounded-xl shadow-post"
                        onClick={handleGossipSubmit}
                    >
                        <span className="font-comic font-bold text-[#603309] text-[20px]">post</span>
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    )
}

export default NewPostModal
