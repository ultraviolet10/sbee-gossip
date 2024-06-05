import Image from "next/image"
import { Inter, Comic_Neue } from "next/font/google"
import Header from "@/components/landing/Header"
import CopyLayout from "@/components/landing/CopyLayout"
import Footer from "@/components/landing/Footer"

const inter = Inter({ subsets: ["latin"] })

export default function Home() {
  return (
    <main
      className={`relative flex min-h-screen  flex-col items-center justify-between ${inter.className}`}
    >
      {/* landing page banner image */}
      <Image
        src={"/img/landing-banner.svg"}
        alt={"landing"}
        className="absolute top-0 left-0"
        fill={true}
      />

      <div className="absolute z-10 flex flex-col min-h-full w-full items-center justify-start px-6 bg-sbee">
        <Header />
        <CopyLayout />
        {/* truth or lie carousel, join now button */}
        <Footer />
      </div>
    </main>
  )
}
