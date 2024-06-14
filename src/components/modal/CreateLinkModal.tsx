/**
 * TODO
 * 재사용성 있게 리팩토링하기
 */
import Image from "next/image"
import { MouseEvent, ReactNode } from "react"
import ModalPortal from "@/components/ModalPortal"

type ModalContainerProps = {
  children: ReactNode
  onClose: () => void
  title?: string
}

export default function CreateLinkContainer({
  children,
  onClose,
  title,
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
        bg-modal-background`}
      >
        <div
          className={`
          w-full p-4 flex flex-col gap-6
          max-w-[520px] min-w-[311px]
          mobile:rounded-sm bg-white 
          `}
        >
          <div className="flex justify-between">
            <h3 className="text-lg font-bold text-basic">{title}</h3>
            <Image
              onClick={onClose}
              src="/icons/close-icon.svg"
              alt="닫기 버튼"
              className="cursor-pointer"
              width={13}
              height={13}
            />
          </div>
          {children}
        </div>
      </section>
    </ModalPortal>
  )
}
