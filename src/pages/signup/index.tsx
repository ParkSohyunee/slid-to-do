import Image from "next/image"
import Link from "next/link"
import { useForm } from "react-hook-form"

import {
  emailValidationRules,
  nameValidationRules,
  passwordForSignUpValidationRules,
} from "@/libs/utils/formInputValidationRules"

type SignUpFormVaules = {
  email: string
  name: string
  password: string
  passwordConfirm: string
}

export default function SignUpPage() {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm<SignUpFormVaules>({ mode: "onBlur" })

  const handleSubmitForm = async (data: SignUpFormVaules) => {
    // 회원가입 API
  }

  return (
    <section
      className={`
      h-dvh 
      flex flex-col items-center 
      pt-[120px] 
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
          priority
        />
      </div>
      <form
        onSubmit={handleSubmit(handleSubmitForm)}
        className="flex flex-col gap-12 max-w-screen-sm w-full"
      >
        <div className="flex flex-col gap-11">
          <div className="relative text-field">
            <div className="flex flex-col">
              <label
                htmlFor="name"
                className="text-base font-semibold mb-3 text-basic"
              >
                이름
              </label>
              <input
                {...register("name", nameValidationRules)}
                className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border border-slate-50 hover:border-blue-300
              focus:border-blue-500 focus:outline-none
              ${!!errors.name ? "border-error hover:border-error" : ""}
              `}
                type="text"
                autoComplete="off"
                placeholder="이름을 입력해 주세요"
              />
            </div>
            <p className="text-sm font-normal text-error mx-4 mt-2">
              {errors.name?.message}
            </p>
          </div>
          <div className="relative text-field">
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-base font-semibold mb-3 text-basic"
              >
                이메일
              </label>
              <input
                {...register("email", emailValidationRules)}
                className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border border-slate-50 hover:border-blue-300
              focus:border-blue-500 focus:outline-none
              ${!!errors.email ? "border-error hover:border-error" : ""}
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
              <input
                {...register("password", passwordForSignUpValidationRules)}
                className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border border-slate-50 hover:border-blue-300
              focus:border-blue-500 focus:outline-none
              ${!!errors.password ? "border-error hover:border-error" : ""}
              `}
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 입력해 주세요"
              />
            </div>
            <p className="text-sm font-normal text-error mx-4 mt-2">
              {errors.password?.message}
            </p>
          </div>
          <div className="relative text-field">
            <div className="flex flex-col">
              <label
                htmlFor="passwordConfirm"
                className="text-base font-semibold mb-3 text-basic"
              >
                비밀번호 확인
              </label>
              <input
                {...register(
                  "passwordConfirm",
                  passwordForSignUpValidationRules,
                )}
                className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border border-slate-50 hover:border-blue-300
              focus:border-blue-500 focus:outline-none
              ${!!errors.passwordConfirm ? "border-error hover:border-error" : ""}
              `}
                type="password"
                autoComplete="off"
                placeholder="비밀번호를 다시 한 번 입력해 주세요"
              />
            </div>
            <p className="text-sm font-normal text-error mx-4 mt-2">
              {errors.passwordConfirm?.message}
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
            ${isValid ? "bg-blue-500" : "bg-slate-400"}
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
    </section>
  )
}
