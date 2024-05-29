import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getProgressForTodos from "@/pages/api/todos/getProgressForTodos"

export default function ProgressForTodos() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getProgressForTodos],
    queryFn: getProgressForTodos,
  })

  console.log(data)

  return (
    <div
      className={`
        bg-blue-500 border border-slate-100 
        rounded-sm h-[250px] 
        flex flex-col px-6 pt-4 pb-6
        max-tablet:p-4
        relative`}
    >
      <div className="flex flex-col items-start gap-4">
        <Image
          src="/icons/todo-progress.svg"
          alt="내 진행 상황"
          width={40}
          height={40}
        />
        <div className="flex flex-col items-start gap-1 text-white">
          <span className="text-lg font-semibold">내 진행 상황</span>
          <div className="flex gap-1 items-center">
            <span className="text-3xl font-bold">{data?.progress}</span>
            <span className="text-base font-semibold">%</span>
          </div>
        </div>
        <Image
          className="absolute right-0 bottom-0"
          src="/icons/progress-card-image.svg"
          alt="카드 이미지"
          width={224}
          height={223}
        />
      </div>
    </div>
  )
}
