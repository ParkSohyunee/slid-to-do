import axiosInstance from "@/libs/axios/axiosInstance"
import { GoalDetail } from "@/types/goal"

type PatchGoalProps = {
  goalId: number
  data: Pick<GoalDetail, "title">
}

export default async function patchGoal({ goalId, data }: PatchGoalProps) {
  const response = await axiosInstance.patch(`/goals/${goalId}`, data)
  return response.data
}
