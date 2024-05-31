import Image from "next/image"
import { useRouter } from "next/router"
import { useRef } from "react"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getGoalDetail from "@/pages/api/goal/getGoalDetail"
import { useDetectClose } from "@/hooks/useDetectClose"

/**
 * TODO
 * [x] 목표 상세 조회 API 연동 (title)
 * [ ] 목표 ID를 가지고, 할 일, 진행률 API 연동 (progress, todo, done)
 * [x] UI 구현
 * [ ] 목표 수정, 삭제 기능 구현
 * [x] 수정, 삭제 팝업 메뉴 구현
 * [ ] 목표 수정시 사이드바에 반영
 * [ ] 목표 삭제의 경우 확인 모달 띄우기
 * [ ] 할 일 없음 UI, 로딩 UI
 * [ ] 기타 애니메이션 적용
 * [ ] 각 할 일 카드 무한스크롤 적용
 */
export default function GoalDetailPage() {
  const router = useRouter()
  const popupRef = useRef(null)
  const goalId = Number(router.query.goalId)
  const { isOpen, toggleHandler } = useDetectClose({ ref: popupRef })

  const { data: goal } = useQuery({
    queryKey: [QUERY_KEYS.getGoalDetail, goalId],
    queryFn: () => getGoalDetail(goalId),
    enabled: !!goalId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  return (
    <section className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">목표</h1>
      <div className="flex flex-col gap-6 h-full">
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
              className="cursor-pointer"
              onClick={toggleHandler}
            />
          </div>
          {isOpen && (
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
          )}
          <div>프로그래스바</div>
        </div>
        <div
          className="
          flex items-center justify-between
          bg-blue-100 px-6 py-4 border border-bule-100 rounded-sm
          "
        >
          <div className="flex items-center gap-2">
            <span>이미지</span>
            <h3 className="text-lg font-bold text-basic">노트 모아보기</h3>
          </div>
          <Image
            src="/icons/arrow-right.svg"
            alt="노트 모아보기 버튼"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <div className="grid gap-6 grid-cols-2">
          <div
            className="
            px-6 py-4 rounded-sm bg-white border border-slate-100
            flex flex-col gap-4
            "
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-basic">To do</h3>
              <button className="flex gap-1 items-center">
                <Image
                  src="/icons/plus-blue-small.svg"
                  alt="할 일 추가 버튼"
                  width={16}
                  height={16}
                />
                <span className="text-sm font-semibold text-blue-500">
                  할일 추가
                </span>
              </button>
            </div>
            <div>할일 목록</div>
          </div>
          <div
            className="
            px-6 py-4 rounded-sm bg-slate-200 border border-slate-100
            flex flex-col gap-4
            "
          >
            <h3 className="text-lg font-bold text-basic">To do</h3>
            <div>할일 목록</div>
          </div>
        </div>
      </div>
    </section>
  )
}
