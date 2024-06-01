import axiosInstance from "@/libs/axios/axiosInstance"
import { AllTodos } from "@/types/todos"

type AllTodosDataProps = {
  [key: string]: unknown
  goalId?: number
  done?: boolean
  cursor?: number
  size?: number
}

export default async function getAllTodos(data?: AllTodosDataProps) {
  const queryParams = new URLSearchParams()

  for (const params in data) {
    if (data[params] !== null) {
      queryParams.append(params, (data[params] as number | boolean).toString())
    }
  }

  const response = await axiosInstance.get<AllTodos>(`/todos?${queryParams}`)
  return response.data
}
