/**
 * TODO
 * 버튼 컴포넌트 공통 컴포넌트로 리팩토링
 * 아이콘, 버튼 등 공통 토스트 컴포넌트 확장
 */
import Image from "next/image"

type ToastProps = {
  message: string
  onClose: () => void
  onClickToast: () => void
}

export default function Toast({ message, onClose, onClickToast }: ToastProps) {
  return (
    <div className="rounded-[28px] bg-blue-50 py-[10px] pr-3 pl-4 flex justify-between items-center">
      <div className="flex gap-4 items-center">
        <Image
          onClick={onClose}
          className="bg-blue-500 rounded-full rotate-45 cursor-pointer"
          src="/icons/close-small-white.svg"
          alt="닫기 버튼"
          width={18}
          height={18}
        />
        <span className="text-sm font-semibold text-blue-500">{message}</span>
      </div>
      <button
        onClick={onClickToast}
        className="rounded-[24px] border border-blue-500 text-sm font-semibold text-blue-500 py-2 px-[17.5px] bg-white"
      >
        불러오기
      </button>
    </div>
  )
}
