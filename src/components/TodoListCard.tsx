import Image from "next/image"
import { MouseEvent } from "react"
import { Todo } from "@/types/todos"

type TodoListCardProps = {
  handleTodoListOfStatus: (e: MouseEvent<HTMLDivElement>) => void
  selectedCategory: string
  todos?: Todo[]
  isLoading: boolean
}

type TodoItemProps = {
  todo: Todo
}

const STATUS_OF_TODO = ["All", "To do", "Done"]

function TodoItem({ todo }: TodoItemProps) {
  return (
    <li
      className={`
      text-sm font-normal text-basic 
      flex items-center justify-between group
      `}
    >
      <div
        className={`flex gap-2 ${todo.goal ? "items-start" : "items-center"}`}
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
        <div className="flex flex-col gap-1">
          <p
            className={`
            ${todo.done && "line-through"} 
            group-hover:text-blue-500 
            transition-all duration-300
            `}
          >
            {todo.title}
          </p>
          {todo.goal && (
            <p className="flex gap-1 items-center text-slate-70 group-hover:text-blue-500">
              <Image src="/icons/goal.svg" alt="목표" width={24} height={24} />
              {todo.goal.title}
            </p>
          )}
        </div>
      </div>
      <div
        className={`
        opacity-0 group-hover:opacity-100 
        flex gap-[10px] 
        transition-opacity duration-300`}
      >
        {!todo.noteId && (
          <div className="bg-slate-50 rounded-full w-6 h-6 cursor-pointer">
            <Image
              src="/icons/note-view.svg"
              alt="노트 보기"
              width={24}
              height={24}
            />
          </div>
        )}
        <div className="bg-slate-50 rounded-full w-6 h-6 p-[5px] cursor-pointer">
          <Image
            src="/icons/meatballs-menu.svg"
            alt="목표 수정 및 삭제 버튼"
            width={14}
            height={14}
          />
        </div>
      </div>
    </li>
  )
}

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
