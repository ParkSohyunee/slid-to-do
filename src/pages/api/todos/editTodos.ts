import axiosInstance from "@/libs/axios/axiosInstance"

type EditTodosType = {
  todoId: number
  data: Record<string, string | number>
}

export default async function editTodos({ todoId, data }: EditTodosType) {
  const response = await axiosInstance.patch(`/todos/${todoId}`, data)
  return response.data
}
