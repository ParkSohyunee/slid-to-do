import axiosInstance from "@/libs/axios/axiosInstance"
import { AuthenticatedUser } from "@/types/user"

type CreateLoginType = {
  email: string
  password: string
}

export default async function createLogin(data: CreateLoginType) {
  const response = await axiosInstance.post<AuthenticatedUser>(
    "/auth/login",
    data,
  )
  return response.data
}
