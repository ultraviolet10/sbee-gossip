import type { AppProps } from "next/app"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { WagmiProvider } from "wagmi"

import "@/styles/globals.css"

import { Toaster } from "@/components/ui/Toaster"
import { SemaphoreContextProvider } from "@/contexts/SemaphoreContext"
import { wagmiConfig } from "@/wagmi"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <WagmiProvider config={wagmiConfig}>
                <QueryClientProvider client={queryClient}>
                    <SemaphoreContextProvider>
                        <Component {...pageProps} />
                        <Toaster expand={false} position="bottom-center" richColors />
                    </SemaphoreContextProvider>
                </QueryClientProvider>
            </WagmiProvider>
        </>
    )
}
