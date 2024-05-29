import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import getGoalList from "@/pages/api/goal/getGoalList"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import TodosAboutGoalCard from "./TodosAboutGoalCard"

export default function TodosAboutGoalContainer() {
  // 3. 목표별 진행률 계산해서 UI 보여주기
  // 4. 목표 무한스크롤 구현 (stale time 등 캐시 적용 고려)

  const { data: goalList } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
  })

  return (
    <div
      className={`
        bg-white border border-slate-100 
        rounded-sm flex flex-col p-6
        `}
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
      <div className="grid grid-cols-2 gap-4">
        {goalList?.goals.map((goal) => (
          <TodosAboutGoalCard
            key={goal.id}
            goalId={goal.id}
            title={goal.title}
          />
        ))}
      </div>
    </div>
  )
}
