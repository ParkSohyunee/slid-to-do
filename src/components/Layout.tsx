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
    <section className="flex wrapper bg-slate-100 max-mobile:flex-col min-h-screen">
      {!isHiddenSideBar && <Sidebar />}
      <main className={`grow ${!isHiddenSideBar && "p-4 tablet:p-6 xl:p-20"}`}>
        {children}
      </main>
    </section>
  )
}
