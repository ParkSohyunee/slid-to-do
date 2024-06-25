import axiosInstance from "@/libs/axios/axiosInstance"

export default async function deleteGoal(goalId: number) {
  await axiosInstance.delete(`/goals/${goalId}`)
}
