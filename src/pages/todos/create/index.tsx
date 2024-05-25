import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"

import { todosLinkUrlValidationRules } from "@/libs/utils/formInputValidationRules"
import { SelectedOption, TodosFormVaules } from "@/types/todos"

import TextField from "@/components/TextField"
import Label from "@/components/Label"

export default function CreateTodosPage() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const methods = useForm({ mode: "onBlur" })
  const {
    register,
    formState: { errors, isValid },
  } = useForm<TodosFormVaules>({
    mode: "onBlur",
    defaultValues: {
      title: "",
      fileUrl: "",
      linkUrl: "",
      goalId: 0,
    },
  })

  const handleToggleSelect = (value: SelectedOption) => {
    setSelectedOption(value)
  }

  const onSubmit = (data: any) => {
    // form 제출
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <h2 className="text-lg font-bold text-basic mb-6">할 일 생성</h2>
      <form
        onSubmit={methods.handleSubmit(onSubmit)}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col gap-6">
          <div>
            <Label htmlFor="title">제목</Label>
            <TextField field="title" placeholder="할 일의 제목을 적어주세요" />
          </div>
          <div className="relative text-field">
            <div className="flex flex-col">
              <label
                htmlFor="reference"
                className="text-base font-semibold mb-3 text-basic"
              >
                자료
              </label>
              <div className="flex gap-3 mb-3">
                <CheckBoxButton
                  option="file"
                  selectedOption={selectedOption}
                  handleToggleSelect={handleToggleSelect}
                />
                <CheckBoxButton
                  option="link"
                  selectedOption={selectedOption}
                  handleToggleSelect={handleToggleSelect}
                />
              </div>
              <input
                {...register("linkUrl", todosLinkUrlValidationRules)}
                className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border focus:border-blue-500 focus:outline-none
              ${
                errors.linkUrl
                  ? "border-error hover:border-error"
                  : "border-slate-50 hover:border-blue-300"
              }
              `}
                type="text"
                autoComplete="off"
                placeholder="영상이나 글, 파일의 링크를 넣어주세요"
              />
            </div>
            <p className="text-sm font-normal text-error mx-4 mt-2">
              {errors.linkUrl?.message}
            </p>
          </div>
        </div>
        <button
          type="submit"
          className={`
            py-3 flex 
            justify-center items-center 
            self-stretch rounded-sm 
            text-white text-base font-semibold
            outline-none
            hover:bg-blue-600 active:bg-blue-800
            transition-colors duration-500
            `}
        >
          확인
        </button>
      </form>
    </FormProvider>
  )
}
