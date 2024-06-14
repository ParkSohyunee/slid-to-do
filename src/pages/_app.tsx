import "@/styles/globals.css"
import type { AppProps } from "next/app"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { CookiesProvider } from "react-cookie"
import Layout from "@/components/Layout"

const queryClient = new QueryClient()

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <CookiesProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
        <ReactQueryDevtools
          initialIsOpen={false}
          buttonPosition="bottom-left"
        />
      </CookiesProvider>
    </QueryClientProvider>
  )
}
