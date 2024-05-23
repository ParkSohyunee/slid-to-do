import { useForm } from "react-hook-form"
import { AxiosError } from "axios"

import createLogin from "@/pages/api/auth/createLogin"
import { setCookie } from "@/libs/utils/cookie"
import {
  emailValidationRules,
  passwordValidationRules,
} from "@/libs/utils/formInputValidationRules"

type LoginFormVaules = {
  email: string
  password: string
}

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormVaules>({ mode: "onBlur" })

  const handleSubmitForm = async (data: LoginFormVaules) => {
    try {
      const result = await createLogin({
        email: data.email,
        password: data.password,
      })
      setCookie("accessToken", result.accessToken)
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "가입되지 않은 이메일입니다.") {
          setError("email", {
            type: "custom",
            message: error.response?.data.message,
          })
        } else {
          setError("password", {
            type: "custom",
            message: error.response?.data.message,
          })
        }
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
      <label htmlFor="email">아이디</label>
      <input {...register("email", emailValidationRules)} autoComplete="off" />
      <p>{errors.email?.message}</p>
      <label htmlFor="password">비밀번호</label>
      <input
        type="password"
        {...register("password", passwordValidationRules)}
      />
      <p>{errors.password?.message}</p>
      <button type="submit">로그인하기</button>
    </form>
  )
}
