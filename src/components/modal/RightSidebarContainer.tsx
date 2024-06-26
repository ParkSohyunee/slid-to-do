import Image from "next/image"
import { ReactNode } from "react"

import ModalPortal from "@/components/ModalPortal"

type RightSidebarContainer = {
  children: ReactNode
  onClickClose: () => void
}

export default function RightSidebarContainer({
  children,
  onClickClose,
}: RightSidebarContainer) {
  return (
    <ModalPortal>
      <section
        className={`
        w-full h-full 
        fixed top-0 left-0 
        flex flex-col justify-center items-center 
        bg-popup-background z-[1]`}
      >
        <div
          className={`
          fixed top-0 right-0 w-full h-full
          lg:max-w-[800px] mobile:max-w-[512px]
          p-4 tablet:p-6 bg-white 
          flex flex-col gap-4 
          overflow-y-auto
          transition-max-width duration-40 ease-linear
          `}
        >
          <Image
            onClick={onClickClose}
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
