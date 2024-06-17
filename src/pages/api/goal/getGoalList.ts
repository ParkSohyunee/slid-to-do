import axiosInstance from "@/libs/axios/axiosInstance"
import { GoalList } from "@/types/goal"

type GoalListProps = {
  [key: string]: unknown
  cursor?: number
  size?: number
}

export default async function getGoalList(data?: GoalListProps) {
  const queryParams = new URLSearchParams()

  for (const params in data) {
    if (data[params] !== null) {
      queryParams.append(params, (data[params] as number).toString())
    }
  }

  const response = await axiosInstance.get<GoalList>(`/goals?${queryParams}`)
  return response.data
}
