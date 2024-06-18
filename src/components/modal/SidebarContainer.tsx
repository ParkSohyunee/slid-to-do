import Image from "next/image"
import { ReactNode } from "react"

import ModalPortal from "@/components/ModalPortal"

type SidebarContainer = {
  children: ReactNode
}

export default function SidebarContainer({ children }: SidebarContainer) {
  return (
    <ModalPortal>
      <section
        className={`
        w-full h-full 
        fixed top-0
        flex flex-col justify-center items-center 
        bg-popup-background`}
      >
        {children}
      </section>
    </ModalPortal>
  )
}
