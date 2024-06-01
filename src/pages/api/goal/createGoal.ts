import axiosInstance from "@/libs/axios/axiosInstance"
import { GoalDetail } from "@/types/goal"

export default async function createGoal(data: Pick<GoalDetail, "title">) {
  const response = await axiosInstance.post("/goals", data)
  return response.data
}
