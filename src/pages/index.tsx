import Image from "next/image"

import CopyLayout from "@/components/layout/CopyLayout"
import Footer from "@/components/layout/Footer"
import Header from "@/components/layout/Header"

export default function Home() {
  return (
    <main
      className={`relative flex min-h-screen flex-col items-start md:items-center justify-between bg-sbee overflow-auto`}
    >
      {/* landing page banner image */}
      <Image
        src={"/img/landing-banner.svg"}
        alt={"landing"}
        className="absolute md:left-0"
        style={{ top: "-140px" }}
        fill
      />

      <div className="absolute z-10 flex flex-col min-h-full w-full items-center justify-start px-4 md:px-12">
        <Header />
        <CopyLayout />
        {/* truth or lie carousel, join now button */}
        <Footer />
      </div>
    </main>
  )
}
