import axios from "axios"

const accessToken = "" // 로그인 기능 구현 전, 임시 토큰

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_SERVER_DOMAIN,
})

axiosInstance.interceptors.request.use(
  (config) => {
    // 만약 토큰이 있다면 조건문 추가
    config.headers.Authorization = `Bearer ${accessToken}`
    return config
  },
  (error) => {
    console.log(error)
    return Promise.reject(error)
  },
)
