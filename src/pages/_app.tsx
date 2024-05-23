import "@/styles/globals.css"
import type { AppProps } from "next/app"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { CookiesProvider } from "react-cookie"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <main className="font-pretendard">
          <Component {...pageProps} />
        </main>
      </CookiesProvider>
    </QueryClientProvider>
  )
}
