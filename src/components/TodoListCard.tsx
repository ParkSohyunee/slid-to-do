import { MouseEvent, MutableRefObject, useRef } from "react"
import { BeatLoader } from "react-spinners"

import { Todo } from "@/types/todos"

import { Skeleton } from "./ui/Skeleton"
import TodoItem from "./TodoItem"

type TodoListCardProps = {
  handleTodoListOfStatus: (e: MouseEvent<HTMLDivElement>) => void
  selectedCategory: string
  todos?: Todo[]
  isLoading: boolean
  observerRef: MutableRefObject<null>
  isFetchingNextPage: boolean
}

const STATUS_OF_TODO = ["All", "To do", "Done"]

export default function TodoListCard({
  handleTodoListOfStatus,
  selectedCategory,
  todos,
  isLoading,
  observerRef,
  isFetchingNextPage,
}: TodoListCardProps) {
  return (
    <div className="rounded-sm border border-slate-100 bg-white p-6 grow flex flex-col gap-4">
      <div className="flex gap-2" onClick={handleTodoListOfStatus}>
        {STATUS_OF_TODO.map((status) => (
          <button
            key={status}
            className={`
            px-3 py-1 rounded-[17px] border text-sm font-medium
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
        <BeatLoader
          color="#3B82F6"
          margin={4}
          className="flex justify-center grow items-center"
        />
      ) : todos && todos?.length > 0 ? (
        <ul className="flex flex-col justify-between gap-1 grow">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {isFetchingNextPage && (
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          <div ref={observerRef} className="h-[2px]"></div>
        </ul>
      ) : (
        <div className="flex items-center justify-center text-sm font-normal text-slate-500 grow">
          {selectedCategory === "All"
            ? "등록한 일이 없어요"
            : selectedCategory === "To do"
              ? "해야할 일이 아직 없어요"
              : "다 한 일이 아직 없어요"}
        </div>
      )}
    </div>
  )
}
