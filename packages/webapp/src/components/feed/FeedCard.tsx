import React from "react"

interface FeedCardProps {
    statement: string
}

const FeedCard: React.FC<FeedCardProps> = ({ statement }) => {
    return (
        <div className="flex flex-col z-10 items-start justify-between p-4 md:p-6 w-full md:h-[420px] rounded-xl bg-white border-[2px] border-gray-200 font-comic">
            <div className="flex flex-col items-start justify-center w-full px-4">
                {/* date of post */}
                <span className="text-black text-[15px] text-left mb-4">23 August, 08:21 AM. 3min ago.</span>
                {/* title */}
                <span className="text-black text-[25px] text-left font-bold mb-4">
                    heading
                </span>
                {/* content */}
                <span className="text-black text-[20px] text-left mb-4">
                    {statement}{" "}
                    <a href="#" className="text-[#f59f00] font-bold">
                        Learn more
                    </a>
                </span>
            </div>

            {/* voting section */}
            <div className="flex flex-col items-center justify-between w-full px-4">
                <span className="text-black text-[20px] mb-4">What you think:</span>
                <div className="flex flex-row w-full items-center justify-center space-x-4 mb-4">
                    <button className="flex items-center justify-center w-[50%] h-[50px] bg-[#97c236] rounded-xl px-3 font-bold text-[15px] md:text-[20px]">
                        I kinda believe it
                    </button>
                    <button className="flex items-center justify-center w-[50%] h-[50px] bg-[#c24836] rounded-xl px-3 font-bold text-[15px] md:text-[20px]">
                        This is BS
                    </button>
                </div>
                {/* percentage stat */}
                <span className="text-black text-[20px] mb-4">
                    56% thought this might be <span className="text-[#f59f00] font-bold">true</span>
                </span>
            </div>
        </div>
    )
}

export default FeedCard
