import { ReactNode } from "react"

type LayoutProps = {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="flex h-dvh bg-slate-100">
      <article className="bg-blue-200 w-[280px] absolute h-full">
        사이드바
      </article>
      <main className="grow py-6 px-6 pl-[360px] w-full">{children}</main>
    </section>
  )
}
