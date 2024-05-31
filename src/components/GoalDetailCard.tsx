import Image from "next/image"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { useDetectClose } from "@/hooks/useDetectClose"
import getGoalDetail from "@/pages/api/goal/getGoalDetail"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"

type GoalDetailCardProps = {
  goalId: number
}

function PopupMenu() {
  return (
    <div
      className={`
      absolute right-0 top-1/2 -translate-x-1/4 
      flex flex-col 
      rounded-sm shadow-lg 
      text-sm font-normal text-slate-700 
      bg-white`}
    >
      <button className="rounded-t-sm px-4 pt-2 pb-[6px] hover:bg-slate-50">
        수정하기
      </button>
      <button className="rounded-b-sm px-4 pb-2 pt-[6px] hover:bg-slate-50">
        삭제하기
      </button>
    </div>
  )
}

export default function GoalDetailCard({ goalId }: GoalDetailCardProps) {
  const popupRef = useRef(null)
  const { isOpen, toggleHandler } = useDetectClose({ ref: popupRef })

  const { data: goal } = useQuery({
    queryKey: [QUERY_KEYS.getGoalDetail, goalId],
    queryFn: () => getGoalDetail(goalId),
    enabled: !!goalId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <div className="bg-white px-6 py-4 border border-slate-100 rounded-sm relative">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center gap-2">
          <span>이미지</span>
          <input
            readOnly={true}
            className="text-lg font-semibold text-basic outline-none"
            value={goal?.title}
          />
        </div>
        <Image
          ref={popupRef}
          src="/icons/meatballs-menu.svg"
          alt="목표 수정 및 삭제 버튼"
          width={24}
          height={24}
          className="cursor-pointer hover:bg-slate-50 rounded-full"
          onClick={toggleHandler}
        />
      </div>
      {isOpen && <PopupMenu />}
      <div>프로그래스바</div>
    </div>
  )
}
