import { useState } from "react"
import { useForm } from "react-hook-form"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"

import {
  todosTitleValidationRules,
  todosLinkUrlValidationRules,
} from "@/libs/utils/formInputValidationRules"
import { SelectedOption } from "@/types/todos"

type TodosFormVaules = {
  title: string
  fileUrl: "string"
  linkUrl: "string"
  goalId: number
}

export default function CreateTodosPage() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const {
    register,
    formState: { errors },
  } = useForm<TodosFormVaules>({ mode: "onBlur" })

  const handleToggleSelect = (value: SelectedOption) => {
    setSelectedOption(value)
  }

  return (
    <section>
      <div>
        <div className="relative text-field">
          <div className="flex flex-col">
            <label
              htmlFor="title"
              className="text-base font-semibold mb-3 text-basic"
            >
              아이디
            </label>
            <input
              {...register("title", todosTitleValidationRules)}
              className={`
              px-6 py-3 
              rounded-sm 
              bg-slate-50 
              text-base font-normal text-basic placeholder:text-slate-400
              border focus:border-blue-500 focus:outline-none
              ${
                errors.title
                  ? "border-error hover:border-error"
                  : "border-slate-50 hover:border-blue-300"
              }
              `}
              type="text"
              autoComplete="off"
              placeholder="이메일을 입력해 주세요"
            />
          </div>
          <p className="text-sm font-normal text-error mx-4 mt-2">
            {errors.title?.message}
          </p>
        </div>
        <div>
          <label
            htmlFor="reference"
            className="text-base font-semibold mb-3 text-basic"
          >
            자료
          </label>
          <div className="flex gap-3">
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
          <p className="text-sm font-normal text-error mx-4 mt-2">
            {errors.linkUrl?.message}
          </p>
        </div>
      </div>
    </section>
  )
}
