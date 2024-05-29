import axiosInstance from "@/libs/axios/axiosInstance"
import { AllTodos } from "@/types/todos"

type getAllTodosProps = {
  [key: string]: unknown
  goalId?: number
  done?: boolean
  cursor?: number
  size?: number
}

export default async function getAllTodos(data: getAllTodosProps) {
  const queryParams = new URLSearchParams({})

  for (const params in data) {
    if (data[params]) {
      queryParams.append(params, (data[params] as number | boolean).toString())
    }
  }

  const response = await axiosInstance.get<AllTodos>(
    `/todos?${queryParams.toString()}`,
  )
  return response.data
}
