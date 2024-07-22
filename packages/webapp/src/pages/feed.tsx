import { NextPage } from "next"

import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

const FeedPage: NextPage = () => {
    // get gossip posts here, send in as a prop to the component
    return (
        <div className="flex flex-col w-full min-h-screen items-center justify-between bg-sbee px-6">
            <Header />

            <div className="flex flex-col w-full h-full items-center justify-center">
                <span className="text-black font-comic text-[45px] md:text-[40px] font-bold mb-4">Truth Or Lie?</span>
                {/* <FeedLayout /> */}
            </div>

            <Footer />
        </div>
    )
}

export default FeedPage
