import axiosInstance from "@/libs/axios/axiosInstance"
import { GoalList } from "@/types/goal"

export default async function getGoalList() {
  const response = await axiosInstance.get<GoalList>("/goals")
  return response.data
}
