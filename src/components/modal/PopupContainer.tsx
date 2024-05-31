import Image from "next/image"
import { ReactNode } from "react"

import { useModal } from "@/context/ModalContext"
import ModalPortal from "@/components/ModalPortal"

type PopupContainerProps = {
  children: ReactNode
  onClick: () => void
}

export default function PopupContainer({
  children,
  onClick,
}: PopupContainerProps) {
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
        <div className="max-w-[450px] min-w-[300px] w-full p-6 rounded-[8px] bg-white flex flex-col gap-6">
          <Image
            onClick={closeModal}
            src="/icons/close-icon.svg"
            alt="닫기 버튼"
            className="cursor-pointer self-end"
            width={13}
            height={13}
          />
          {children}
          <div className="flex gap-2 justify-center mt-[26px]">
            <button
              onClick={closeModal}
              className="rounded-sm border border-blue-500 w-[120px] text-base font-semibold text-blue-500 h-12"
            >
              취소
            </button>
            <button
              onClick={onClick}
              className="rounded-sm w-[120px] text-base font-semibold text-white bg-blue-500 h-12"
            >
              확인
            </button>
          </div>
        </div>
      </section>
    </ModalPortal>
  )
}
