import { useRouter } from "next/router"
import { ReactNode } from "react"
import Sidebar from "./Sidebar"
import { ModalContextProvider } from "@/context/ModalContext"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const hiddenLayoutPath = ["/login", "/signup", "/"]
  const bgWhiteStyle = [
    "/todos-list/[todoId]/write-note",
    "/goal/[goalId]/notes/[noteId]/edit",
    "/login",
    "/signup",
  ]
  const router = useRouter()
  const isHiddenSideBar = hiddenLayoutPath.includes(router.asPath)
  const bgColor = bgWhiteStyle.includes(router.pathname)
    ? "bg-white"
    : "bg-slate-100"

  return (
    <section
      className={`flex wrapper ${bgColor} max-mobile:flex-col min-h-screen`}
    >
      <ModalContextProvider>
        {!isHiddenSideBar && <Sidebar />}
      </ModalContextProvider>
      <main
        className={`grow ${!isHiddenSideBar && "p-4 sm:p-6 sm:pl-[84px] xl:pl-20"}`}
      >
        {children}
      </main>
    </section>
  )
}
