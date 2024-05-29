import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"
import { useQueries } from "@tanstack/react-query"
import Image from "next/image"

type TodosAboutGoalCardProps = {
  goalId: number
  title: string
}

export default function TodosAboutGoalCard({
  goalId,
  title,
}: TodosAboutGoalCardProps) {
  const isDone = [true, false]
  const [{ data: doneTodo }, { data: progressTodo }] = useQueries({
    queries: isDone.map((done) => ({
      queryKey: [QUERY_KEYS.getAllTodos, goalId, done],
      queryFn: () =>
        getAllTodos({
          goalId,
          done,
        }),
      enabled: !!goalId,
    })),
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
      <div>
        <ul>
          {doneTodo?.todos.map((todo) => <li key={todo.id}>{todo.title}</li>)}
        </ul>
        <ul>
          {progressTodo?.todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
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
