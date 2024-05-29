import axiosInstance from "@/libs/axios/axiosInstance"
import { ProgressForTodos } from "@/types/todos"

export default async function getProgressForTodos() {
  const response = await axiosInstance.get<ProgressForTodos>("/todos/progress")
  return response.data
}
