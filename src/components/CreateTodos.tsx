import { useEffect, useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "@tanstack/react-query"

import {
  todosLinkUrlValidationRules,
  todosTitleValidationRules,
} from "@/libs/utils/formInputValidationRules"
import { SelectedOption, Todo, TodosFormVaules } from "@/types/todos"

import CheckBoxButton from "@/components/buttons/CheckBoxButton"
import TextField from "@/components/TextField"
import Label from "@/components/Label"
import UploadFile from "@/components/UploadFile"
import Dropdown from "./Dropdown"

import createTodos from "@/pages/api/todos/createTodos"
import uploadFiles from "@/pages/api/todos/uploadFiles"
import editTodos from "@/pages/api/todos/editTodos"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import { DropdownProvider } from "@/context/DropdownContext"

type CreateTodosProps = {
  onClose: () => void
  edit?: boolean
  todo?: Todo
}

export default function CreateTodos({
  onClose,
  edit = false,
  todo,
}: CreateTodosProps) {
  const queryClient = useQueryClient()
  const [selectedOption, setSelectedOption] = useState<SelectedOption>("file")
  const [uploadFile, setUploadFile] = useState<File>()
  const methods = useForm<TodosFormVaules>({
    mode: "onBlur",
    defaultValues: {
      title: todo?.title,
      linkUrl: todo?.linkUrl,
      fileUrl: todo?.fileUrl,
      goalId: todo?.goal?.id,
      done: todo?.done ? "Done" : "To do",
    },
  })
  const { isValid } = methods.formState

  const createTodoMutation = useMutation({
    mutationFn: createTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllTodos],
      })
    },
    onError: () => {
      alert("할 일 생성에 실패했어요. 다시 시도해주세요.")
    },
    onSettled: () => {
      onClose()
    },
  })

  const editTodoMutation = useMutation({
    mutationFn: editTodos,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllTodos],
      })
    },
    onError: () => {
      alert("할 일 수정에 실패했어요. 다시 시도해주세요.")
    },
    onSettled: () => {
      onClose()
    },
  })

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
      if (data[key] && data[key] !== "") {
        filteredData[key] = data[key] as string | number
      }
    }
    createTodoMutation.mutate(filteredData)
  }

  /** 할 일 수정 이벤트 핸들러 */
  const handleEditForm = async (data: TodosFormVaules) => {
    if (!todo) return

    const defaultValueOfDone = todo?.done ? "Done" : "To do"

    if (
      todo.title === data.title &&
      !todo.fileUrl &&
      !uploadFile &&
      todo.fileUrl === data.fileUrl &&
      todo.linkUrl === data.linkUrl &&
      todo.goal?.id === data.goalId &&
      defaultValueOfDone === data.done
    ) {
      alert("수정한 내용이 없습니다.")
      return
    }

    const filteredData: Record<string, unknown> = {}

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
      if (data[key] && data[key] !== "") {
        filteredData[key] = data[key] as string | number
      }
    }

    filteredData["done"] = data.done === "Done"

    editTodoMutation.mutate({
      todoId: todo?.id as number,
      data: filteredData,
    })
  }

  useEffect(() => {
    if (todo) {
      if (todo?.fileUrl) {
        setSelectedOption("file")
      } else if (todo?.linkUrl) {
        setSelectedOption("link")
      }
    }
  }, [todo])

  return (
    <FormProvider {...methods}>
      <h2 className="text-lg font-bold text-basic mb-6">할 일 생성</h2>
      <form
        onSubmit={methods.handleSubmit(
          edit ? handleEditForm : handleSubmitForm,
        )}
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
                fileUrl={todo?.fileUrl}
              />
            ) : (
              <TextField
                field="linkUrl"
                placeholder="영상이나 글, 파일의 링크를 넣어주세요"
                validationRules={todosLinkUrlValidationRules}
              />
            )}
          </div>
          <div>
            <Label htmlFor="title">목표</Label>
            <DropdownProvider>
              <Dropdown />
            </DropdownProvider>
          </div>
        </div>
        {edit && (
          <div>
            <Label htmlFor="done">To do / Done</Label>
            <div className="flex gap-6 items-center">
              <div className="flex gap-2 items-center">
                <input
                  {...methods.register("done")}
                  type="radio"
                  value="To do"
                  defaultChecked={!todo?.done}
                />
                <label className="text-md text-basic font-medium">To do</label>
              </div>
              <div className="flex gap-2 items-center">
                <input
                  {...methods.register("done")}
                  type="radio"
                  value="Done"
                  defaultChecked={todo?.done}
                />
                <label className="text-md text-basic font-medium">Done</label>
              </div>
            </div>
          </div>
        )}
        <button
          type="submit"
          disabled={createTodoMutation.isPending || editTodoMutation.isPending}
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
          {createTodoMutation.isPending || editTodoMutation.isPending
            ? "저장중..."
            : "확인"}
        </button>
      </form>
    </FormProvider>
  )
}
