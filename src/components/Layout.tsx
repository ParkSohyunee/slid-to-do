import { useRouter } from "next/router"
import { ReactNode } from "react"
import Sidebar from "./Sidebar"
import { ModalContextProvider } from "@/context/ModalContext"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const hiddenLayoutPath = ["/login", "/signup"]
  const bgWhiteStyle = ["/todos-list/[todoId]/write-note"]
  const router = useRouter()
  const isHiddenSideBar = hiddenLayoutPath.includes(router.asPath)
  const bgColor = bgWhiteStyle.includes(router.pathname)
    ? "bg-white"
    : "bg-slate-100"

  return (
    <section
      className={`flex wrapper ${bgColor} max-mobile:flex-col min-h-screen`}
    >
      {!isHiddenSideBar && (
        <ModalContextProvider>
          <Sidebar />
        </ModalContextProvider>
      )}
      <main className={`grow ${!isHiddenSideBar && "p-4 tablet:p-6 xl:pl-20"}`}>
        <ModalContextProvider>{children}</ModalContextProvider>
      </main>
    </section>
  )
}
