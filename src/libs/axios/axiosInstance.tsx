import axios from "axios"
import { getCookie } from "../utils/cookie"

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
})

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = getCookie("accessToken")

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`
    }
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)

export default axiosInstance
