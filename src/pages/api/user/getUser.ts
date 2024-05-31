import axiosInstance from "@/libs/axios/axiosInstance"
import { User } from "@/types/user"

export default async function getUser() {
  const response = await axiosInstance.get<User>("/user")
  return response.data
}
