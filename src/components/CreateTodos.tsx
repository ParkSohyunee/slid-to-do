import { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import {
  todosLinkUrlValidationRules,
  todosTitleValidationRules,
} from "@/libs/utils/formInputValidationRules"
import { SelectedOption, TodosFormVaules } from "@/types/todos"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"
import TextField from "@/components/TextField"
import Label from "@/components/Label"
import UploadFile from "@/components/UploadFile"

import createTodos from "@/pages/api/todos/createTodos"
import uploadFiles from "@/pages/api/todos/uploadFiles"

export default function CreateTodos() {
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const [uploadFile, setUploadFile] = useState<File>()
  const methods = useForm<TodosFormVaules>({ mode: "onBlur" })
  const { isValid } = methods.formState

  /** 자료 첨부(파일 또는 링크) 옵션 선택 */
  const handleToggleSelect = (value: SelectedOption) => {
    setSelectedOption(value)
  }

  /** todos form 제출 이벤트 핸들러 */
  const handleSubmitForm = async (data: TodosFormVaules) => {
    const filteredData: Record<string, string | number> = {}

    /** 파일 업로드 url 생성 */
    if (selectedOption === "file") {
      if (uploadFile) {
        const uploadFileUrl = await uploadFiles({ file: uploadFile })
        filteredData["fileUrl"] = uploadFileUrl.url
      }
    } else {
      if (data.linkUrl) {
        filteredData["linkUrl"] = data["linkUrl"]
      }
    }

    for (const key in data) {
      if (data[key] !== "") {
        filteredData[key] = data[key] as string | number
      }
    }

    try {
      const result = await createTodos(filteredData)
      console.log(result)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <FormProvider {...methods}>
      <h2 className="text-lg font-bold text-basic mb-6">할 일 생성</h2>
      <form
        onSubmit={methods.handleSubmit(handleSubmitForm)}
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
            {selectedOption === "file" ? (
              <UploadFile
                uploadFile={uploadFile}
                setUploadFile={setUploadFile}
              />
            ) : (
              <TextField
                field="linkUrl"
                placeholder="영상이나 글, 파일의 링크를 넣어주세요"
                validationRules={todosLinkUrlValidationRules}
              />
            )}
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
            ${isValid ? "bg-blue-500" : "bg-slate-400"}
            transition-colors duration-500
            `}
        >
          확인
        </button>
      </form>
    </FormProvider>
  )
}
