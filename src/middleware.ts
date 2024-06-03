import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

const REQUIRED_LOGIN_PATH = ["/goal", "/dashboard", "/todos-list"]
const PUBLIC_PATH = ["/login", "/signup"]

export function middleware(request: NextRequest) {
  const currentPath = request.nextUrl.pathname
  const accessToken = request.cookies.get("accessToken")
  const refreshToken = request.cookies.get("refreshToken")

  // '/goal'로 시작하는 하위 URL 포함 조건 추가
  const isGoalSubPath = currentPath.startsWith("/goal")

  // 비회원이 로그인이 필요한 페이지에 접근 시, 로그인 페이지로 리다이렉트
  if (
    !accessToken &&
    !refreshToken &&
    (REQUIRED_LOGIN_PATH.includes(currentPath) || isGoalSubPath)
  ) {
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }

  // 회원이 로그인 또는 회원가입 페이지로 접근 시, 대시보드 페이지로 리다이렉트
  if ((accessToken || refreshToken) && PUBLIC_PATH.includes(currentPath)) {
    const url = new URL("/dashboard", request.url)
    return NextResponse.redirect(url)
  }
}
