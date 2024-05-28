import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex h-dvh bg-slate-100">
      <article className="bg-blue-200 xl:w-[280px] tablet:w-[60px] absolute h-full"></article>
      <main className="w-full grow p-4 xl:pl-[360px] tablet:p-6 tablet:pl-[81px]">
        {children}
      </main>
    </section>
  )
}
