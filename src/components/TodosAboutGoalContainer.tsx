import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import getGoalList from "@/pages/api/goal/getGoalList"
import getAllTodos from "@/pages/api/todos/getAllTodos"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"

type TodosAboutGoalCardProps = {
  goalId: number
  title: string
}

function TodosAboutGoalCard({ goalId, title }: TodosAboutGoalCardProps) {
  const { data: todosAboutGoal } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos, goalId],
    queryFn: () =>
      getAllTodos({
        goalId,
      }),
    enabled: !!goalId,
  })

  return (
    <ul className="p-6">
      <div>{title}</div>
      <ul>
        {todosAboutGoal?.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button>더보기</button>
    </ul>
  )
}

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
      <div>
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
