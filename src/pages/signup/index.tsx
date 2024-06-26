import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/router"
import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import {
  emailValidationRules,
  nameValidationRules,
  passwordForSignUpValidationRules,
} from "@/libs/utils/formInputValidationRules"
import axiosInstance from "@/libs/axios/axiosInstance"
import { AxiosError } from "axios"

import Label from "@/components/Label"
import TextField from "@/components/TextField"
import { BeatLoader } from "react-spinners"

type SignUpFormVaules = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

export default function SignUpPage() {
  const router = useRouter()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [visiblePasswordConfirm, setVisiblePasswordConfirm] = useState(false)
  const methods = useForm<SignUpFormVaules>({ mode: "onBlur" })
  const {
    handleSubmit,
    watch,
    setError,
    formState: { isValid, isSubmitting },
  } = methods

  const handleVisiblePassword =
    (value: "password" | "passwordConfirm") => () => {
      if (value === "password") {
        setVisiblePassword((prev) => !prev)
      } else {
        setVisiblePasswordConfirm((prev) => !prev)
      }
    }

  const handleSubmitForm = async (data: SignUpFormVaules) => {
    try {
      await axiosInstance.post("/user", {
        email: data.email,
        name: data.name,
        password: data.password,
      })
      router.push("/login") // TODO 가입 완료 토스트메세지
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.data.message === "이미 사용 중인 이메일입니다.") {
          setError("email", {
            type: "custom",
            message: error.response?.data.message,
          })
        }
      }
    }
  }

  return (
    <section
      className={`
      h-full
      flex flex-col items-center 
      py-[60px] 
      max-tablet:pt-[64px] max-mobile:pt-[48px] 
      px-[52px] max-tablet:px-4
    `}
    >
      {isSubmitting && (
        <BeatLoader
          color="#3B82F6"
          className="absolute top-1/2 right-1/2 translate-x-1/2 z-[1]"
        />
      )}
      <div className="mb-10">
        <Image
          src={"/logo/img_logo.svg"}
          alt="logo"
          width={270}
          height={89}
          priority
        />
      </div>
      <FormProvider {...methods}>
        <form
          onSubmit={handleSubmit(handleSubmitForm)}
          className="flex flex-col gap-12 max-w-[640px] w-full"
        >
          <div className="flex flex-col gap-10">
            <div>
              <Label htmlFor="name">이름</Label>
              <TextField
                field="name"
                placeholder="이름을 입력해 주세요"
                validationRules={nameValidationRules}
              />
            </div>
            <div>
              <Label htmlFor="email">이메일</Label>
              <TextField
                field="email"
                placeholder="이메일을 입력해 주세요"
                validationRules={emailValidationRules}
              />
            </div>
            <div>
              <Label htmlFor="password">비밀번호</Label>
              <TextField
                field="password"
                placeholder="비밀번호를 입력해 주세요"
                validationRules={passwordForSignUpValidationRules}
                textInputType={visiblePassword}
              >
                <Image
                  onClick={handleVisiblePassword("password")}
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer"
                  src={`/icons/visibility-${visiblePassword ? "on" : "off"}.svg`}
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              </TextField>
            </div>
            <div>
              <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
              <TextField
                field="passwordConfirm"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
                validationRules={{
                  required: "비밀번호를 다시 한 번 입력해 주세요.",
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "비밀번호가 일치하지 않습니다."
                    }
                    return true
                  },
                }}
                textInputType={visiblePasswordConfirm}
              >
                <Image
                  onClick={handleVisiblePassword("passwordConfirm")}
                  className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer"
                  src={`/icons/visibility-${visiblePasswordConfirm ? "on" : "off"}.svg`}
                  alt="비밀번호 보기"
                  width={24}
                  height={24}
                />
              </TextField>
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
              회원가입하기
            </button>
            <p className="text-sm font-medium flex gap-1 justify-center">
              <span className="text-basic">이미 회원이신가요?</span>
              <span className="text-bland-blue underline">
                <Link href={"/login"}>로그인</Link>
              </span>
            </p>
          </div>
        </form>
      </FormProvider>
    </section>
  )
}
