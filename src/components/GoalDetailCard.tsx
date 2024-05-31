import Image from "next/image"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { useDetectClose } from "@/hooks/useDetectClose"
import getGoalDetail from "@/pages/api/goal/getGoalDetail"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import patchGoal from "@/pages/api/goal/patchGoal"

type GoalDetailCardProps = {
  goalId: number
}

type PopupMenuProps = {
  onClickEdit: () => void
}

function PopupMenu({ onClickEdit }: PopupMenuProps) {
  return (
    <div
      className={`
      absolute right-0 top-1/2 -translate-x-1/4 
      flex flex-col 
      rounded-sm shadow-lg 
      text-sm font-normal text-slate-700 
      bg-white`}
    >
      <button
        onClick={onClickEdit}
        className="rounded-t-sm px-4 pt-2 pb-[6px] hover:bg-slate-50"
      >
        수정하기
      </button>
      <button className="rounded-b-sm px-4 pb-2 pt-[6px] hover:bg-slate-50">
        삭제하기
      </button>
    </div>
  )
}

export default function GoalDetailCard({ goalId }: GoalDetailCardProps) {
  const queryClient = useQueryClient()
  const popupRef = useRef(null)
  const { isOpen, toggleHandler } = useDetectClose({ ref: popupRef })
  const [title, setTitle] = useState("")
  const [isEdit, setIsEdit] = useState(false)

  const { data: goal } = useQuery({
    queryKey: [QUERY_KEYS.getGoalDetail, goalId],
    queryFn: () => getGoalDetail(goalId),
    enabled: !!goalId,
  })

  const editGoalMutation = useMutation({
    mutationFn: patchGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalList],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalDetail, goalId],
      })
      setTitle("")
      setIsEdit(false)
      alert("목표를 수정이 완료되었습니다!")
    },
    onError: () => {
      alert("목표 수정에 실패했어요. 다시 시도해주세요.")
    },
  })

  const handleEditInput = () => {
    setIsEdit(true)
  }

  const handleChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value)
  }

  /** 목표 수정 이벤트 핸들러 */
  const handleEditGoalTitle = async (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      if (!title) {
        alert("목표를 입력해주세요.") // TODO 모달로 변경하기
        return
      }
      if (title === goal?.title) {
        alert("다른 목표 제목을 입력해주세요.")
        return
      }
      editGoalMutation.mutate({
        goalId,
        data: {
          title,
        },
      })
    }
  }

  /** 각 목표 상세 페이지가 mount될 때마다 상태 초기화 */
  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "")
      setIsEdit(false)
    }
  }, [goal])

  return (
    <div className="bg-white px-6 py-4 border border-slate-100 rounded-sm relative">
      <div className="flex justify-between items-center pb-6">
        <div className="flex items-center gap-2 w-full">
          <span>이미지</span>
          {isEdit ? (
            <input
              type="text"
              className="text-lg font-semibold text-basic outline-none grow"
              value={title}
              placeholder="목표를 입력해주세요"
              autoFocus
              onChange={handleChangeTitle}
              onKeyUp={handleEditGoalTitle}
            />
          ) : (
            <h3 className="text-lg font-semibold text-basic outline-none grow">
              {goal?.title}
            </h3>
          )}
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
      {isOpen && <PopupMenu onClickEdit={handleEditInput} />}
      <div>프로그래스바</div>
    </div>
  )
}
