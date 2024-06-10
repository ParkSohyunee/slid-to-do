import Image from "next/image"
import { Todo } from "@/types/todos"

type DetailNoteProps = {
  todo: Todo
}

export default function DetailNote({ todo }: DetailNoteProps) {
  const { createdAt, done, goal, title } = todo

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-3">
        {goal && (
          <h3 className="flex gap-[6px] text-base font-medium text-basic items-center">
            <Image
              className="w-6 h-6 rounded-[6px] bg-slate-800 p-1"
              src="/icons/flag-white.svg"
              alt="목표"
              width={16}
              height={16}
            />
            {goal.title}
          </h3>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              {done ? "Done" : "To do"}
            </span>
            <span className="text-sm font-normal text-slate-700">{title}</span>
          </div>
          <span className="text-xs font-normal text-slate-500">
            {createdAt}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-3 grow justify-between">
        <div className="pt-3 pb-3 border-t border-b border-slate-200 flex items-center justify-between">
          <p className="text-lg font-medium text-basic w-full">
            프로그래밍과 데이터 in JavaScript
          </p>
        </div>
      </div>
    </div>
  )
}
