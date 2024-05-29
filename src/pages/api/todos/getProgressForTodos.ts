import axiosInstance from "@/libs/axios/axiosInstance"

export default async function getProgressForTodos() {
  const response = await axiosInstance.get("/todos/progress")
  return response.data
}
