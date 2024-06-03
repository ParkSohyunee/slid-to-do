import axiosInstance from "@/libs/axios/axiosInstance"

export default async function deleteTodo(todoId: number) {
  await axiosInstance.delete(`/todos/${todoId}`)
}
