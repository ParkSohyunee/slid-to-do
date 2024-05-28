import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"

export default function RecentlyTodosCard() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos],
    queryFn: getAllTodos,
  })

  console.log(data) // 삭제 예정

  return (
    <div className="bg-white border border-slate-100 rounded-sm h-[250px] flex flex-col gap-4 px-6 pt-4 pb-6">
      <div className="flex items-center justify-between">
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
      <ul className="pb-3 flex flex-col justify-between gap-2">
        {data?.todos.map((todo) => (
          <li
            key={todo.id}
            className={`flex gap-2 text-sm font-normal text-basic ${todo.done && "line-through"}`}
          >
            <Image
              src={
                todo.done
                  ? "/icons/checkbox-active.svg"
                  : "/icons/checkbox-inactive.svg"
              }
              alt="할 일 완료 여부"
              width={24}
              height={24}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  )
}
