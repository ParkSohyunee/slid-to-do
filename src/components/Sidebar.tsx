import Image from "next/image"
import Link from "next/link"
import { ChangeEvent, useState, KeyboardEvent } from "react"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getUser from "@/pages/api/user/getUser"
import createGoal from "@/pages/api/goal/createGoal"
import getGoalList from "@/pages/api/goal/getGoalList"

export default function Sidebar() {
  const queryClient = useQueryClient()
  const [isVisibleInput, setIsVisibleInput] = useState(false)
  const [newGoal, setNewGoal] = useState("")

  const { data: user } = useQuery({
    queryKey: [QUERY_KEYS.getUser],
    queryFn: getUser,
  })

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
    staleTime: 1000 * 60 * 5,
  })

  const createGoalMutation = useMutation({
    mutationFn: createGoal,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getGoalList],
      })
      setNewGoal("")
      setIsVisibleInput(false)
    },
    onError: () => {
      alert("목표를 다시 생성해주세요")
    },
  })

  const handleVisibleInput = () => {
    setIsVisibleInput((prev) => !prev)
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    setNewGoal(e.target.value)
  }

  // TODO 목표 생성 후, 리스트 업데이트되도록 - Optimistic UI로 리팩토링 해보기
  // TODO 리액트 훅 폼으로 변경 고려 - 리팩토링
  const onSubmit = async (e: KeyboardEvent) => {
    if (e.code === "Enter") {
      if (!newGoal) return
      createGoalMutation.mutate({
        title: newGoal,
      })
    }
  }

  return (
    <article
      className={`
      bg-white border border-r-slate-200
        w-[280px] absolute h-full 
        max-tablet:relative 
        max-tablet:h-12`}
    >
      <div className="p-6 border-b border-slate-200">
        <div className="flex justify-between items-center">
          <Image src="/logo/img_logo.svg" alt="logo" width={96} height={19} />
          <button>
            <Image src="/icons/fold-ic.svg" alt="logo" width={24} height={24} />
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
            <p className="text-sm font-semibold text-basic">{user?.name}</p>
            <p className="text-sm font-medium text-slate-600">{user?.email}</p>
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
      <div className="px-6 py-4  border-b border-slate-200">
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
      <div className="px-6 py-4">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-2">
            <Image
              src="/icons/sidebar-flag.svg"
              alt="목표 리스트"
              width={24}
              height={24}
            />
            <span className="text-lg font-medium text-basic">목표</span>
          </div>
          <div className="flex flex-col gap-6">
            <ul className="list-disc list-inside text-sm font-medium text-slate-700">
              {data?.goals.map((goal) => (
                <li key={goal.id} className="p-2">
                  {goal.title}
                </li>
              ))}
              {isVisibleInput && (
                <li className="p-2">
                  <input
                    type="text"
                    autoComplete="off"
                    autoFocus={isVisibleInput}
                    placeholder="목표를 입력해주세요"
                    className="outline-none placeholder:text-slate-400 placeholder:font-normal"
                    onChange={handleChangeInput}
                    onKeyUp={onSubmit}
                  />
                </li>
              )}
            </ul>
            <button
              onClick={handleVisibleInput}
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
// xl:w-[280px] tablet:w-[60px]
