import React from "react"
import Image from "next/image"

interface CopyProps {}

const CopyLayout: React.FC<CopyProps> = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4 px-6">
            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="flex flex-col items-start justify-center space-y-6">
                    <span className="text-black font-bold font-comic text-[25px]">LetSBeeHonest</span>
                    <span className="text-black font-semibold font-comic text-left text-[18px]">
                        Some call us truth-tellers, others call us sting bees. Where do you buzz? #SBEEtheChange
                    </span>
                    <span className="text-black font-comic text-left text-[15px]">
                        StingScoop is the decentralized platform where anonymity meets accountability. Here, we harness
                        the power of zero-knowledge proofs to let you share the bloody honest truth about the industry
                        without fear of retribution.
                    </span>
                    <button className="bg-[#ffc70f] w-[120px] h-12 border-[#f59f00] border-[2px] font-comic text-[20px] font-bold rounded-xl">
                        Get Started
                    </button>
                </div>

                <Image src={"/img/hand-holding-phone.svg"} alt={"phone"} width={450} height={450} />
            </div>

            <div className="flex flex-col-reverse space-y-4 w-full md:flex-row md:items-center justify-between">
                <Image src={"/img/new-post.svg"} alt={"phone"} width={450} height={450} className="mt-4" />
                <div className="flex flex-col items-start justify-center mt-4 space-y-6 md:w-[50%]">
                    <span className="text-black font-bold font-comic text-[25px]">LetSBeeHonest</span>
                    <span className="text-black font-semibold font-comic text-[18px] text-left">
                        Expose bad actors, uncover rug pulls, and shine a light on the dark corners of the blockchain
                        world. Every post is a beacon of transparency, and every vote is a step towards a more honest
                        ecosystem.
                    </span>
                </div>
            </div>

            <div className="flex flex-col space-y-4 md:flex-row items-center justify-between">
                <div className="flex flex-col items-start justify-center space-y-6 md:w-[50%]">
                    <span className="text-black font-bold font-comic text-[25px]">LetSBeeHonest</span>
                    <span className="text-black font-semibold font-comic text-[18px] text-left">
                        Connect your wallet, mask your identity, and start buzzing with the community. Share your
                        insights and let the Farcaster network decide: is it truth or lies?
                    </span>
                    <span className="text-black font-comic font-bold text-left text-[18px]">#SBEEtheChange</span>
                </div>
                <Image src={"/img/accept-or-not.svg"} alt={"phone"} width={450} height={450} />
            </div>
        </div>
    )
}

export default CopyLayout
