import { useRouter } from "next/router"
import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const hiddenLayoutPath = ["/login", "/signup"]
  const router = useRouter()
  const isHiddenSideBar = hiddenLayoutPath.includes(router.asPath)

  return (
    <section className="flex h-dvh bg-slate-100 max-tablet:flex-col">
      {!isHiddenSideBar && (
        <article
          className={`
            bg-blue-200 
            xl:w-[280px] tablet:w-[60px] 
            absolute 
            h-full 
            max-tablet:relative 
            max-tablet:h-12`}
        ></article>
      )}
      <main
        className={`
        w-full grow 
        ${!isHiddenSideBar && "p-4 xl:pl-[360px] tablet:p-6 tablet:pl-[81px]"}`}
      >
        {children}
      </main>
    </section>
  )
}
