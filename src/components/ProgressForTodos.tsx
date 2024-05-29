import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getProgressForTodos from "@/pages/api/todos/getProgressForTodos"
import { useQuery } from "@tanstack/react-query"

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
    ></div>
  )
}
