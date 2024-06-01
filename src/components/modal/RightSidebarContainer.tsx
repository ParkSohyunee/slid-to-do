import Image from "next/image"
import { ReactNode } from "react"

import { useModal } from "@/context/ModalContext"
import ModalPortal from "@/components/ModalPortal"

type RightSidebarContainer = {
  children: ReactNode
}

export default function RightSidebarContainer({
  children,
}: RightSidebarContainer) {
  const { isOpen, closeModal } = useModal()

  if (!isOpen) {
    return null
  }

  return (
    <ModalPortal>
      <section
        className={`
        w-full h-full 
        fixed top-0 left-0 
        flex flex-col justify-center items-center 
        bg-popup-background`}
      >
        <div className="fixed top-0 right-0 w-[800px] h-full p-6 bg-white flex flex-col gap-4">
          <Image
            onClick={closeModal}
            src="/icons/close-icon.svg"
            alt="닫기 버튼"
            className="cursor-pointer w-6 h-6 p-[5px]"
            width={13}
            height={13}
          />
          {children}
        </div>
      </section>
    </ModalPortal>
  )
}
