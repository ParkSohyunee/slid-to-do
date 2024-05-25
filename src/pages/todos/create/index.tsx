import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"

import {
  todosLinkUrlValidationRules,
  todosTitleValidationRules,
} from "@/libs/utils/formInputValidationRules"
import { SelectedOption } from "@/types/todos"

import TextField from "@/components/TextField"
import Label from "@/components/Label"

export default function CreateTodosPage() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const methods = useForm({
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
            <TextField
              field="title"
              placeholder="할 일의 제목을 적어주세요"
              validationRules={todosTitleValidationRules}
            />
          </div>
          <div className="flex flex-col">
            <Label htmlFor="reference">자료</Label>
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
            <TextField
              field="linkUrl"
              placeholder="영상이나 글, 파일의 링크를 넣어주세요"
              validationRules={todosLinkUrlValidationRules}
            />
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
