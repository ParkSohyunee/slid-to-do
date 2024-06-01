import axiosInstance from "@/libs/axios/axiosInstance"
import { GoalDetail } from "@/types/goal"

export default async function getGoalDetail(goalId: number) {
  const response = await axiosInstance.get<GoalDetail>(`goals/${goalId}`)
  return response.data
}
