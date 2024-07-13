import type { AppProps } from "next/app"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/Toaster"
import { SemaphoreContextProvider } from "@/contexts/SemaphoreContext"

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <SemaphoreContextProvider>
                <Component {...pageProps} />
                <Toaster expand={false} position="bottom-center" richColors />
            </SemaphoreContextProvider>
        </>
    )
}
