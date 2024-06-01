import Image from "next/image"
import Link from "next/link"
import { useRef } from "react"

import { useDetectClose } from "@/hooks/useDetectClose"

export default function Sidebar() {
  const buttonRef = useRef(null)
  const { toggleHandler, isOpen } = useDetectClose({ ref: buttonRef })

  return (
    <article
      className={`
      bg-white border border-r-slate-200
       w-[280px]
        `}
    >
      <div className="flex flex-col p-4 gap-4 items-center hidden">
        <Image src="/logo/logo-small.svg" alt="logo" width={32} height={32} />
        <button>
          <Image
            src="/icons/expand-ic.svg"
            alt="사이드바 열기"
            width={32}
            height={32}
          />
        </button>
      </div>
      <div className="p-6 border-b border-slate-200 max-tablet:hidden">
        <div className="flex justify-between items-center">
          <Image src="/logo/img_logo.svg" alt="logo" width={96} height={19} />
          <button>
            <Image
              src="/icons/fold-ic.svg"
              alt="사이드바 닫기"
              width={24}
              height={24}
            />
          </button>
        </div>
        <div className="flex gap-3 pt-[18px] pb-6">
          <Image
            src="/icons/avatar.svg"
            alt="프로필 이미지"
            width={64}
            height={64}
          />
          <div>
            <p className="text-sm font-semibold text-basic">체다치즈</p>
            <p className="text-sm font-medium text-slate-600">
              chedacheese@slid.kr
            </p>
            <button className="text-xs font-normal text-slate-400">
              로그아웃
            </button>
          </div>
        </div>
        <button className="w-full flex h-12 rounded-sm bg-blue-500 gap-1 justify-center items-center">
          <Image
            src="/icons/plus-white-large.svg"
            alt="새 할 일 추가하기 버튼"
            width={24}
            height={24}
          />
          <span className="text-base font-semibold text-white">새 할일</span>
        </button>
      </div>
      <div className="px-6 py-4  border-b border-slate-200 max-tablet:hidden">
        <Link href="/dashboard" className="flex items-center gap-2">
          <Image
            src="/icons/sidebar-home.svg"
            alt="대시보드로 이동하기"
            width={24}
            height={24}
          />
          <span className="text-lg font-medium text-basic">대시보드</span>
        </Link>
      </div>
      <div className="px-6 py-4 max-tablet:hidden">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/flag-slate.svg"
              alt="목표 리스트"
              width={24}
              height={24}
            />
            <span className="text-lg font-medium text-basic">목표</span>
          </div>
          <div className="flex flex-col gap-6">
            <ul className="list-disc list-inside text-sm font-medium text-slate-700">
              <li className="p-2">목표1</li>
              <li className="p-2">목표2</li>
              {isOpen && (
                <li className="p-2">
                  <input
                    type="text"
                    autoComplete="off"
                    autoFocus={isOpen}
                    placeholder="목표를 입력해주세요"
                    className="outline-none placeholder:text-slate-400 placeholder:font-normal"
                  />
                </li>
              )}
            </ul>
            <button
              ref={buttonRef}
              onClick={toggleHandler}
              className="w-full flex h-12 rounded-sm gap-1 justify-center items-center border border-blue-500"
            >
              <Image
                src="/icons/plus-blue-large.svg"
                alt="새 목표 추가하기 버튼"
                width={24}
                height={24}
              />
              <span className="text-base font-semibold text-blue-500">
                새 목표
              </span>
            </button>
          </div>
        </div>
      </div>
    </article>
  )
}
