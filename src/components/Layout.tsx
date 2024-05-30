import { useRouter } from "next/router"
import { ReactNode } from "react"
import Sidebar from "./Sidebar"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const hiddenLayoutPath = ["/login", "/signup"]
  const router = useRouter()
  const isHiddenSideBar = hiddenLayoutPath.includes(router.asPath)

  return (
    <section className="flex h-dvh bg-slate-100 max-tablet:flex-col">
      {!isHiddenSideBar && <Sidebar />}
      <main
        className={`
        w-full grow 
        ${!isHiddenSideBar && "p-4 xl:pl-[360px] tablet:p-6 tablet:pl-[80px]"}`}
      >
        {children}
      </main>
    </section>
  )
}
