import { useQuery } from "@tanstack/react-query"

import Dropdown from "@/components/Dropdown"
import { DropdownProvider } from "@/context/DropdownContext"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getGoalList from "@/pages/api/goal/getGoalList"

export default function GoalDropdownForTodos() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
  })

  return (
    <DropdownProvider>
      <Dropdown list={data?.goals || []} />
    </DropdownProvider>
  )
}
