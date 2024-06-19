import Image from "next/image"
import { MouseEvent, ReactNode } from "react"
import ModalPortal from "@/components/ModalPortal"

type ModalContainerProps = {
  children: ReactNode
  onClose: () => void
}

export default function ModalContainer({
  children,
  onClose,
}: ModalContainerProps) {
  const handleOutSideClick = (e: MouseEvent<HTMLElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <ModalPortal>
      <section
        onClick={handleOutSideClick}
        className={`
        w-full h-full 
        fixed top-0 left-0 
        flex flex-col justify-center items-center 
        bg-modal-background z-[2]`}
      >
        <div
          className={`
          relative w-full h-full 
          max-w-[520px] min-w-[375px]
          max-h-[690px] max-tablet:max-h-[812px] 
          p-4 tablet:p-6 
          mobile:rounded-sm bg-white 
          overflow-auto`}
        >
          <Image
            onClick={onClose}
            src="/icons/close-icon.svg"
            alt="닫기 버튼"
            className="absolute top-6 right-6 cursor-pointer"
            width={13}
            height={13}
          />
          {children}
        </div>
      </section>
    </ModalPortal>
  )
}
