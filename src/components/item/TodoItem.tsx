import { Todo } from "@/types/todos"
import Image from "next/image"

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  return (
    <li
      className={`
      text-sm font-normal text-basic w-full
      flex items-center gap-2 
      ${todo.done && "line-through"}
      `}
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
      <span className="truncate">{todo.title}</span>
      {todo.noteId && (
        <Image
          src="/icons/note-view.svg"
          alt="노트 보기"
          width={24}
          height={24}
        />
      )}
    </li>
  )
}
