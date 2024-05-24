import { useState } from "react"
import { useForm } from "react-hook-form"

import CheckBoxIcon from "@/components/CheckBoxIcon"
import { todosTitleValidationRules } from "@/libs/utils/formInputValidationRules"

type TodosFormVaules = {
  title: string
  fileUrl: "string"
  linkUrl: "string"
  goalId: number
}

type SelectedOption = "file" | "link"

export default function CreateTodosPage() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const {
    register,
    formState: { errors },
  } = useForm<TodosFormVaules>({ mode: "onBlur" })

  const handleToggleSelect = (value: SelectedOption) => () => {
    setSelectedOption(value)
  }

  console.log(selectedOption)

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
        <label
          htmlFor="reference"
          className="text-base font-semibold mb-3 text-basic"
        >
          자료
        </label>
        <div>
          <button className="flex" onClick={handleToggleSelect("file")}>
            <CheckBoxIcon
              state={selectedOption === "file" ? "active-white" : "inactive"}
            />
            파일 업로드
          </button>
          <button className="flex" onClick={handleToggleSelect("link")}>
            <CheckBoxIcon
              state={selectedOption === "link" ? "active-white" : "inactive"}
            />
            링크 첨부
          </button>
        </div>
      </div>
    </section>
  )
}
