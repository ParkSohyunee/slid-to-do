import { useQuery } from "@tanstack/react-query"

import Dropdown from "@/components/Dropdown"
import { DropdownProvider } from "@/context/DropdownContext"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getGoalList from "@/pages/api/goal/getGoalList"

const DEFAUL_LIST = "목표를 선택해주세요"

export default function GoalDropdownForTodos() {
  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
  })

  return (
    <DropdownProvider>
      <Dropdown list={data?.goals || []} defaultList={DEFAUL_LIST} />
    </DropdownProvider>
  )
}
