import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import getGoalList from "@/pages/api/goal/getGoalList"
import getAllTodos from "@/pages/api/todos/getAllTodos"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"

export default function TodosAboutGoalCard() {
  // 1. 내 모든 목표 리스트 조회
  // 2. 목표별 할 일 리스트 조회
  // 3. 목표별 진행률 계산해서 UI 보여주기
  // 4. 목표 무한스크롤 구현 (stale time 등 캐시 적용 고려)

  const { data: goalList } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
  })

  const goalId = 2 // 특정 아이디 전달하기

  const { data: todosAboutGoal } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos, goalId],
    queryFn: () =>
      getAllTodos({
        goalId: 2,
      }),
    enabled: !!goalList?.goals, // 특정 아이디 전달하기
  })

  console.log(todosAboutGoal)

  return (
    <div
      className={`
        bg-white border border-slate-100 
        rounded-sm h-[250px] 
        flex flex-col px-6 pt-4 pb-6
        max-tablet:p-4
        relative`}
    >
      <div className="flex items-center justify-between pb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/todo-goals.svg"
            alt="최근 등록한 할 일"
            width={40}
            height={40}
          />
          <span className="text-base tablet:text-lg font-semibold text-basic">
            목표 별 할 일
          </span>
        </div>
      </div>
      <div></div>
    </div>
  )
}
