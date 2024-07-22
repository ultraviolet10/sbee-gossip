import React, { useCallback, useState } from "react"

import { toast } from "sonner"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { Textarea } from "@/components/ui/Textarea"
import { useSemaphoreContext } from "@/contexts/SemaphoreContext"
import useStore from "@/store/store"

interface NewPostModalProps {}

const NewPostModal: React.FC<NewPostModalProps> = () => {
    const [gossipContent, setGossipContent] = useState<string | undefined>(undefined)
    const [open, setOpen] = useState<boolean>(false)
    const { addGossip, semaphoreIdentity } = useStore()

    const { addUserToGroup, users, submitGossip } = useSemaphoreContext()

    const handleGossipInput = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setGossipContent(event.target.value)
    }

    const handleGossipSubmit = useCallback(async () => {
        if (users && users.length < 2) {
            // users come in pre loaded from the deploy script
            console.log("No anonymity in a group of one!")
            return
        }

        // if identity commitment is not present in the group (onchain), add it first
        if (users.indexOf(semaphoreIdentity?.commitment.toString() as string) === -1) {
            await addUserToGroup(semaphoreIdentity!.commitment) // returns t / f
        }

        // some user addition drama as well
        // user has typed something out
        if (gossipContent) {
            const gossipOnChain = await submitGossip(semaphoreIdentity!, gossipContent as string)

            if (gossipOnChain) {
                try {
                    const response = await fetch('/api/newGossip', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json',
                      },
                      body: JSON.stringify({ gossipContent }),
                    });
              
                    const result = await response.json();
                    console.log(result)
                    if (response.ok) {
                        toast.info("Gossip statement recorded successfully! Head on over to the telegram bot to read the spice! 🌶️🌶️🌶️")
                    } else {
                      toast.error("an error occured")
                    }
                  } catch (error) {
                    toast.error("an error occured")
                  }
            }
            addGossip(gossipContent)
            setGossipContent(undefined)

            setOpen(false)
        }
    }, [addGossip, addUserToGroup, gossipContent, semaphoreIdentity, submitGossip, users])

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
