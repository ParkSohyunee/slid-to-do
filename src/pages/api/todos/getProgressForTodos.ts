import axiosInstance from "@/libs/axios/axiosInstance"
import { ProgressForTodos } from "@/types/todos"

export default async function getProgressForTodos(goalId?: number) {
  const query = goalId ? `goalId=${goalId}` : ""
  const response = await axiosInstance.get<ProgressForTodos>(
    `/todos/progress?${query}`,
  )
  return response.data
}
