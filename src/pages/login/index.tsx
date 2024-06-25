import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { BeatLoader } from "react-spinners"

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
  const router = useRouter()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    setError,
  } = useForm<LoginFormVaules>({ mode: "onBlur" })

  const handleVisiblePassword = () => {
    setVisiblePassword((prev) => !prev)
  }

  const handleSubmitForm = async (data: LoginFormVaules) => {
    try {
      const result = await createLogin({
        email: data.email,
        password: data.password,
      })
      setCookie("accessToken", result.accessToken)
      setCookie("refreshToken", result.refreshToken)
      router.push("/dashboard")
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
    <>
      {isSubmitting && (
        <BeatLoader
          color="#3B82F6"
          className="absolute top-1/2 right-1/2 translate-x-1/2 h-full z-10"
        />
      )}
      <section
        className={`
      h-full
      flex flex-col items-center 
      py-[120px] 
      max-tablet:pt-[64px] max-mobile:pt-[48px] 
      px-[52px] max-tablet:px-4
      `}
      >
        <div className="mb-10">
          <Image
            src={"/logo/img_logo.svg"}
            alt="logo"
            width={270}
            height={89}
          />
        </div>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-12 max-w-[640px] w-full"
        >
          <div className="flex flex-col gap-11">
            <div className="relative text-field">
              <div className="flex flex-col">
                <label
                  htmlFor="email"
                  className="text-base font-semibold mb-3 text-basic"
                >
                  아이디
                </label>
                <input
                  {...register("email", emailValidationRules)}
                  className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border focus:border-blue-500 focus:outline-none
              ${!!errors.email ? "border-error hover:border-error" : "border-slate-50 hover:border-blue-300"}
              `}
                  type="text"
                  autoComplete="off"
                  placeholder="이메일을 입력해 주세요"
                />
              </div>
              <p className="text-sm font-normal text-error mx-4 mt-2">
                {errors.email?.message}
              </p>
            </div>
            <div className="relative text-field">
              <div className="flex flex-col">
                <label
                  htmlFor="password"
                  className="text-base font-semibold mb-3 text-basic"
                >
                  비밀번호
                </label>
                <div className="relative">
                  <input
                    {...register("password", passwordValidationRules)}
                    className={`
                    px-6 py-3 w-full rounded-sm bg-slate-50 
                    text-base font-normal text-basic placeholder:text-slate-400
                    border focus:border-blue-500 focus:outline-none
                    ${
                      !!errors.password
                        ? "border-error hover:border-error"
                        : "border-slate-50 hover:border-blue-300"
                    }
                    `}
                    type={visiblePassword ? "text" : "password"}
                    autoComplete="off"
                    placeholder="비밀번호를 입력해 주세요"
                  />
                  <Image
                    onClick={handleVisiblePassword}
                    className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer"
                    src={`/icons/visibility-${visiblePassword ? "on" : "off"}.svg`}
                    alt="비밀번호 보기"
                    width={24}
                    height={24}
                  />
                </div>
              </div>
              <p className="text-sm font-normal text-error mx-4 mt-2">
                {errors.password?.message}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-10">
            <button
              disabled={isSubmitting}
              type="submit"
              className={`
            py-3 flex 
            justify-center items-center 
            self-stretch rounded-sm 
            text-white text-base font-semibold
            outline-none
            hover:bg-blue-600 active:bg-blue-800
            ${isValid && !isSubmitting ? "bg-blue-500" : "bg-slate-400"}
            transition-colors duration-500
            `}
            >
              로그인하기
            </button>
            <p className="text-sm font-medium flex gap-1 justify-center">
              <span className="text-basic">슬리드 투 두가 처음이신가요?</span>
              <span className="text-bland-blue underline">
                <Link href={"/signup"}>회원가입</Link>
              </span>
            </p>
          </div>
        </form>
      </section>
    </>
  )
}
