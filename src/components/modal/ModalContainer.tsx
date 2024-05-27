import { ReactNode } from "react"

import { useModal } from "@/context/ModalContext"
import ModalPortal from "@/components/ModalPortal"

type ModalContainerProps = {
  children: ReactNode
}

export default function ModalContainer({ children }: ModalContainerProps) {
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
      bg-modal-background`}
      >
        <div className="relative w-[520px] p-6 rounded-sm bg-white">
          <img
            onClick={closeModal}
            src="/icons/close-icon.svg"
            alt="닫기 버튼"
            className="absolute top-6 right-6 cursor-pointer"
          />
          {children}
        </div>
      </section>
    </ModalPortal>
  )
}
