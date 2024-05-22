import { Cookies } from "react-cookie"

const cookies = new Cookies()

export const setCookie = (
  name: "accessToken" | "refreshToken",
  value: string,
) => {
  return cookies.set(name, value, {
    path: "/",
    secure: true,
  })
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}

export const removeCookie = (name: string) => {
  return cookies.remove(name, { path: "/" })
}
