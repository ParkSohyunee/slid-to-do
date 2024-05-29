import axiosInstance from "@/libs/axios/axiosInstance"
import { AllTodos } from "@/types/todos"

export default async function getAllTodos() {
  const response = await axiosInstance.get<AllTodos>("/todos")
  return response.data
}
