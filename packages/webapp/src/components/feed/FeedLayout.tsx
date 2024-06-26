import React from "react"

import FeedCard from "./FeedCard"

import useStore from "@/store/store"

interface FeedLayoutProps {
    // posts, votes
}

const FeedLayout: React.FC<FeedLayoutProps> = () => {
    const { gossips } = useStore()
    
    return (
        <div className="flex flex-col w-full md:w-[70%] h-full overflow-y-auto items-center justify-center space-y-4">
            {gossips.map((gossip: string, index: number) => (
                <FeedCard key={index} statement={gossip} />
            ))}
        </div>
    )
}

export default FeedLayout
