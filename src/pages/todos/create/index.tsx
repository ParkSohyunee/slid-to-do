import Image from "next/image"
import { ChangeEvent, useRef, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"

import {
  todosLinkUrlValidationRules,
  todosTitleValidationRules,
} from "@/libs/utils/formInputValidationRules"
import { SelectedOption, TodosFormVaules } from "@/types/todos"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"
import TextField from "@/components/TextField"
import Label from "@/components/Label"
import createTodos from "@/pages/api/todos/createTodos"
import uploadFiles from "@/pages/api/todos/uploadFiles"

export default function CreateTodosPage() {
  const hiddenInputRef = useRef<HTMLInputElement>(null)
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const [uploadFile, setUploadFile] = useState<File>()
  const methods = useForm<TodosFormVaules>({ mode: "onBlur" })
  const { isValid } = methods.formState

  /** 자료 첨부(파일 또는 링크) 옵션 선택 */
  const handleToggleSelect = (value: SelectedOption) => {
    setSelectedOption(value)
  }

  /** 업로드 할 파일 url 변경 */
  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setUploadFile(e.target.files[0])
    }
  }

  /** todos form 제출 이벤트 핸들러 */
  const handleSubmitForm = async (data: TodosFormVaules) => {
    const filteredData: Record<string, string | number> = {}

    for (const key in data) {
      if (data[key] !== "") {
        filteredData[key] = data[key] as string | number
      }
    }

    /** 파일 업로드 url 생성 */
    if (uploadFile) {
      const uploadFileUrl = await uploadFiles({
        file: uploadFile,
      })
      filteredData["fileUrl"] = uploadFileUrl.url as string
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
              <>
                <button
                  type="button"
                  onClick={() => hiddenInputRef.current?.click()}
                  className={`
                  h-[184px] rounded-sm bg-slate-50 
                  text-base font-normal text-slate-400 
                  flex flex-col items-center justify-center gap-2`}
                >
                  <Image
                    src={
                      uploadFile
                        ? "/icons/file-uploaded.svg"
                        : "/icons/gray-plus-large.svg"
                    }
                    alt="파일 업로드 버튼"
                    width={24}
                    height={24}
                  />
                  {uploadFile ? uploadFile.name : "파일을 업로드해주세요"}
                </button>
                <input
                  type="file"
                  onChange={handleChangeFile}
                  ref={hiddenInputRef}
                  className="hidden"
                />
              </>
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
