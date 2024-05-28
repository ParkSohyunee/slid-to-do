import { useQuery } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"

export default function RecentlyTodosCard() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos],
    queryFn: getAllTodos,
  })

  console.log(data)

  return <div className="bg-blue-300">최근 등록한 할 일</div>
}
