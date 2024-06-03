import axios, { AxiosError, AxiosRequestConfig } from "axios"
import { getCookie, removeCookie, setCookie } from "../utils/cookie"

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

let isRefreshing = false

type ErrorResponse = {
  message: string
}

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error: AxiosError<ErrorResponse>) => {
    const originalRequest = error.config as AxiosRequestConfig
    const refreshToken = getCookie("refreshToken")

    // 만약 에러가 unAthurizaion error 이면, AT로 RT 재발급 받기
    if (
      error.response?.status === 401 &&
      error.response.data.message === "Unauthorized"
    ) {
      // RT도 만료된 사용자로 재로그인 유도
      if (!refreshToken && !isRefreshing) {
        removeCookie("accessToken")
        isRefreshing = true
        alert("다시 로그인해주세요.")
        location.href = "/login"
      }

      if (!isRefreshing) {
        try {
          const { data } = await axios.post(
            `${process.env.NEXT_PUBLIC_SERVER_DOMAIN}/auth/tokens`,
            {},
            {
              headers: {
                Authorization: `Bearer ${refreshToken}`,
              },
            },
          )

          const newAccessToken = data.accessToken
          setCookie("accessToken", newAccessToken)

          originalRequest.headers = originalRequest.headers || {}
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
          return axiosInstance(originalRequest)
        } catch (error) {
          // AT 재발급에 실패하면, 다시 로그인 하기로 유도
          removeCookie("accessToken")
          removeCookie("refreshToken")

          alert("다시 로그인해주세요.")
          location.href = "/login"
        } finally {
          isRefreshing = true
        }
      }
    }
    return Promise.reject(error)
  },
)

export default axiosInstance
