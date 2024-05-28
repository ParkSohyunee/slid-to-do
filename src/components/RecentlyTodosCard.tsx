import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"
import { Todo } from "@/types/todos"

type RecentlyTodoListProps = {
  todoList: Todo
}

function RecentlyTodoList({ todoList }: RecentlyTodoListProps) {
  const iconPath = todoList.done
    ? "/icons/checkbox-active.svg"
    : "/icons/checkbox-inactive.svg"

  return (
    <li className={`flex items-start gap-2 `}>
      <Image src={iconPath} alt="할 일 완료 여부" width={24} height={24} />
      <div
        className={`flex flex-col text-sm font-normal ${todoList.done && "line-through"}`}
      >
        <p className="text-basic">{todoList.title}</p>
        {todoList.goal && (
          <p className="flex gap-[6px] text-slate-700">
            <Image src="/icons/goal.svg" alt="목표" width={24} height={24} />
            {todoList.goal.title}
          </p>
        )}
      </div>
    </li>
  )
}

export default function RecentlyTodosCard() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos],
    queryFn: getAllTodos,
  })

  return (
    <div
      className={`
      bg-white border border-slate-100 
      rounded-sm h-[250px] 
      lex flex-col px-6 pt-4 pb-6`}
    >
      <div className="flex items-center justify-between pb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/todo-recently.svg"
            alt="최근 등록한 할 일"
            width={40}
            height={40}
          />
          <span className="text-lg font-semibold text-basic">
            최근 등록한 할 일
          </span>
        </div>
        <button className="flex items-center text-sm font-medium text-slate-600">
          모두 보기
          <Image
            src="/icons/arrow-right.svg"
            alt="모두 보기 버튼"
            width={24}
            height={24}
          />
        </button>
      </div>
      <ul className="flex flex-col justify-between gap-2 overflow-auto">
        {data?.todos
          .filter((_, index) => index < 4)
          .map((todo) => <RecentlyTodoList key={todo.id} todoList={todo} />)}
      </ul>
      <div></div>
    </div>
  )
}
