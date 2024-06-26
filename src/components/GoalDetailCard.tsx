import Image from "next/image"
import { useRouter } from "next/router"
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { BeatLoader } from "react-spinners"

import getGoalDetail from "@/pages/api/goal/getGoalDetail"
import patchGoal from "@/pages/api/goal/patchGoal"
import getProgressForTodos from "@/pages/api/todos/getProgressForTodos"
import deleteGoal from "@/pages/api/goal/deleteGoal"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import { useDetectClose } from "@/hooks/useDetectClose"
import useToggle from "@/hooks/useToggle"

import PopupContainer from "@/components/modal/PopupContainer"
import ProgressBar from "@/components/progress/ProgressBar"
import { Skeleton } from "@/components/ui/Skeleton"

type GoalDetailCardProps = {
  goalId: number
}

type PopupMenuProps = {
  onClickEdit: () => void
  onClickDelete: () => void
}

function PopupMenu({ onClickEdit, onClickDelete }: PopupMenuProps) {
  return (
    <div
      className={`
      absolute right-0 top-1/2 -translate-x-1/4 
      flex flex-col 
      rounded-sm shadow-lg 
      text-sm font-normal text-slate-700 
      bg-white z-10`}
    >
      <button
        onClick={onClickEdit}
        className="rounded-t-sm px-4 pt-2 pb-[6px] hover:bg-slate-50"
      >
        수정하기
      </button>
      <button
        onClick={onClickDelete}
        className="rounded-b-sm px-4 pb-2 pt-[6px] hover:bg-slate-50"
      >
        삭제하기
      </button>
    </div>
  )
}

export default function GoalDetailCard({ goalId }: GoalDetailCardProps) {
  const queryClient = useQueryClient()
  const router = useRouter()
  const popupRef = useRef(null)
  const { isOpen, toggleHandler } = useDetectClose({ ref: popupRef })
  const [title, setTitle] = useState("")
  const [isEdit, setIsEdit] = useState(false)
  const confirmModal = useToggle()

  const {
    data: goal,
    isError,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: [QUERY_KEYS.getGoalDetail, goalId],
    queryFn: () => getGoalDetail(goalId),
    enabled: !!goalId,
    retry: 1,
    staleTime: 1000 * 60 * 5,
  })

  const { data: progressForGoal } = useQuery({
    queryKey: [QUERY_KEYS.getProgressForTodos, goalId],
    queryFn: () => getProgressForTodos(goalId),
    enabled: !!goalId,
    staleTime: 1000 * 60 * 5,
  })

  const editGoalMutation = useMutation({
    mutationFn: patchGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalList],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalInfiniteList],
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

  const deleteGoalMutation = useMutation({
    mutationFn: () => deleteGoal(goalId),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalList],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalInfiniteList],
      })
      router.back()
      confirmModal.close()
    },
    onError: () => {
      alert("목표 삭제에 실패했어요. 다시 시도해주세요.")
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

  /** 목표 삭제 이벤트 핸들러 */
  const handleDeleteGoal = () => {
    deleteGoalMutation.mutate()
  }

  /** 각 목표 상세 페이지가 mount될 때마다 상태 초기화 */
  useEffect(() => {
    if (goal) {
      setTitle(goal.title || "")
      setIsEdit(false)
    }
  }, [goal])

  if (isError) {
    alert("목표를 찾을 수 없어요.")
    router.push("/dashboard")
    return
  }

  return (
    <div>
      <div className="bg-white px-6 py-4 border border-slate-100 rounded-sm relative">
        <div className="flex justify-between items-center pb-6">
          <div className="flex items-center gap-2 w-full">
            <Image
              className="w-10 h-10 rounded-[15px] bg-slate-800 p-2"
              src="/icons/flag-white.svg"
              alt="목표"
              width={24}
              height={24}
            />
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
            ) : isLoading || isFetching ? (
              <Skeleton className="h-8 w-[200px] rounded-[8px]" />
            ) : (
              <h3 className="text-lg font-semibold text-basic outline-none grow">
                {goal?.title}
              </h3>
            )}
          </div>
          <div
            onClick={toggleHandler}
            className="cursor-pointer hover:bg-slate-50 rounded-full w-10 h-10 p-2"
          >
            <Image
              ref={popupRef}
              src="/icons/meatballs-menu.svg"
              alt="목표 수정 및 삭제 버튼"
              width={24}
              height={24}
            />
          </div>
        </div>
        {isOpen && (
          <PopupMenu
            onClickEdit={handleEditInput}
            onClickDelete={confirmModal.open}
          />
        )}
        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold text-slate-900">Progress</p>
          <ProgressBar progress={progressForGoal?.progress} />
        </div>
      </div>
      {confirmModal.isOpen &&
        (deleteGoalMutation.isPending ? (
          <BeatLoader
            color="#3B82F6"
            className="absolute top-1/2 right-1/2 translate-x-1/2 z-10"
          />
        ) : (
          <PopupContainer
            onClick={handleDeleteGoal}
            onClickClose={confirmModal.close}
          >
            <p className="text-center text-base font-medium text-basic">
              목표를 삭제할까요?
            </p>
          </PopupContainer>
        ))}
    </div>
  )
}
