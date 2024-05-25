import axiosInstance from "@/libs/axios/axiosInstance"

export default async function createTodos(
  data: Record<string, string | number>,
) {
  const response = await axiosInstance.post("/todos", data)
  return response.data
}
