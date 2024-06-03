import { Cookies } from "react-cookie"

const cookies = new Cookies()

type TokenType = "accessToken" | "refreshToken"

export const setCookie = (name: TokenType, value: string) => {
  return cookies.set(name, value, {
    path: "/",
    secure: true,
  })
}

export const getCookie = (name: TokenType) => {
  return cookies.get(name)
}

export const removeCookie = (name: TokenType) => {
  return cookies.remove(name, { path: "/" })
}
