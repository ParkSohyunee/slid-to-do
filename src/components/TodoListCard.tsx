import { MouseEvent } from "react"
import { Todo } from "@/types/todos"
import TodoItem from "./item/TodoItem"

type TodoListCardProps = {
  handleTodoListOfStatus: (e: MouseEvent<HTMLDivElement>) => void
  selectedCategory: string
  todos?: Todo[]
  isLoading: boolean
}

const STATUS_OF_TODO = ["All", "To do", "Done"]

export default function TodoListCard({
  handleTodoListOfStatus,
  selectedCategory,
  todos,
  isLoading,
}: TodoListCardProps) {
  return (
    <div className="rounded-sm border border-slate-100 bg-white p-6 grow flex flex-col gap-4">
      <div className="flex gap-2" onClick={handleTodoListOfStatus}>
        {STATUS_OF_TODO.map((status) => (
          <button
            key={status}
            className={`
          px-3 py-1 rounded-[17px] border  text-sm font-medium
          ${
            status === selectedCategory
              ? "text-white border-blue-500 bg-blue-500"
              : "text-basic border-slate-200"
          }
          `}
          >
            {status}
          </button>
        ))}
      </div>
      {isLoading ? (
        <div>로딩 중</div>
      ) : todos ? (
        <ul className="flex flex-col justify-between gap-2 overflow-auto">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
        </ul>
      ) : (
        <div>데이터가 없어요.</div>
      )}
    </div>
  )
}
