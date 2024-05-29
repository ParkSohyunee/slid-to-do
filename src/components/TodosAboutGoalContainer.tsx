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
    <ul
      className={`
      p-6 rounded-md bg-blue-50 
      flex flex-col items-center gap-4`}
    >
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex justify-between items-center self-stretch">
          <h3 className="text-lg font-bold text-basic">{title}</h3>
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
        <div>프로그래스바</div>
      </div>
      <ul>
        {todosAboutGoal?.todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
      <button
        className={`
        flex gap-[2px] items-center justify-center
        rounded-basic bg-white p-1 w-[120px] 
        text-sm font-semibold text-slate-700`}
      >
        <span>더보기</span>
        <Image
          className="rotate-90"
          src="/icons/arrow-right.svg"
          alt="더보기 버튼"
          width={24}
          height={24}
        />
      </button>
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
