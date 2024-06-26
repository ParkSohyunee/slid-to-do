import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { FormProvider, useForm } from "react-hook-form"
import { AxiosError } from "axios"
import { useQueryClient } from "@tanstack/react-query"

import DefaultEditor from "@/components/editor/DefaultEditor"
import Toast from "@/components/popup/Toast"
import { noteTitleValidationRules } from "@/libs/utils/formInputValidationRules"
import { NoteFormData } from "@/types/note"
import axiosInstance from "@/libs/axios/axiosInstance"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"

export default function WriteNoteForTodoPage() {
  const queryClient = useQueryClient()
  const [isShowToast, setIsShowToast] = useState(false)
  const router = useRouter()
  const { title: todoTitle, done, goal: goalTitle, todoId } = router.query

  const methods = useForm<NoteFormData>({ mode: "onBlur" })

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    setValue,
    getValues,
  } = methods

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 토스트 닫기 */
  const handleCloseToast = () => {
    setIsShowToast(false)
  }

  /** 노트 작성하기 */
  const onSubmitNote = async (data: NoteFormData) => {
    const isContent =
      editorState.getCurrentContent().getPlainText("").trim().length > 0
    if (!isContent) {
      alert("노트를 작성해주세요")
      return
    }

    try {
      await axiosInstance.post("/notes", {
        todoId: Number(todoId),
        title: data.title,
        content: data.content,
        linkUrl: data.linkUrl,
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllTodosInfinite], // TODO 해당 할 일만 업데이트 하기
      })
      router.push("/todos-list")
    } catch (error) {
      if (error instanceof AxiosError) {
        alert(error.message) // TODO 토스트 메세지로 변경하기
      }
    }
  }

  /** 에디터 콘텐츠를 로컬스토리지에 임시 저장하기 */
  const onClickSaveContents = () => {
    const titleValidation =
      !!getValues("title") && getValues("title").trim().length > 0

    if (!titleValidation) {
      alert("노트 제목을 입력해주세요")
      return
    }

    const contentState = editorState.getCurrentContent() // editor의 현재 contents를 반환
    const raw = convertToRaw(contentState) // convert ContentState Object to a raw structure
    localStorage.setItem(`note-${todoId}-content`, JSON.stringify(raw))
    localStorage.setItem(`note-${todoId}-title`, getValues("title").trim())
    alert("임시 저장되었습니다.") // TODO 토스트 메세지로 변경하기
  }

  /** 임시 저장된 데이터 불러오기 */
  const onClickGetSavedContents = () => {
    const rawContent = localStorage.getItem(`note-${todoId}-content`)
    if (rawContent) {
      const contentState = convertFromRaw(JSON.parse(rawContent)) // convert raw state to a ContentState
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
    }
    const title = localStorage.getItem(`note-${todoId}-title`)
    if (title) {
      setValue("title", title)
    }
    setIsShowToast(false)
  }

  /** 임시 저장된 데이터가 있다면 토스트메세지 띄우기 */
  useEffect(() => {
    const rawContent = localStorage.getItem(`note-${todoId}-content`)
    if (rawContent) {
      setIsShowToast(true)
    }
  }, [todoId])

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitNote)}
        className="h-full max-w-1200 flex flex-col bg-white"
      >
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-lg font-semibold text-slate-900">노트 작성</h1>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClickSaveContents}
              className="text-sm font-semibold text-blue-500 py-3 px-6"
            >
              임시저장
            </button>
            <button
              type="submit"
              disabled={!isValid}
              className={`
            text-sm font-semibold text-white py-3 px-6 rounded-sm 
            ${
              isValid &&
              editorState.getCurrentContent().getPlainText("").trim().length > 0
                ? "bg-blue-500"
                : "bg-slate-400"
            }
            `}
            >
              작성 완료
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            {goalTitle && (
              <h3 className="flex gap-[6px] text-base font-medium text-basic items-center">
                <Image
                  className="w-6 h-6 rounded-[6px] bg-slate-800 p-1"
                  src="/icons/flag-white.svg"
                  alt="목표"
                  width={16}
                  height={16}
                />
                {goalTitle}
              </h3>
            )}
            <div className="flex gap-2 items-center">
              <div className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
                {done ? "Done" : "To do"}
              </div>
              <span className="text-sm font-normal text-slate-700">
                {todoTitle}
              </span>
            </div>
            {isShowToast && (
              <Toast
                message="임시 저장된 노트가 있어요. 저장된 노트를 불러오시겠어요?"
                onClose={handleCloseToast}
                onClickToast={onClickGetSavedContents}
              />
            )}
          </div>
          <div className="flex flex-col gap-3 grow justify-between">
            <div className="pt-3 pb-3 border-t border-b border-slate-200 flex items-center justify-between">
              <input
                {...register("title", noteTitleValidationRules)}
                placeholder="노트의 제목을 입력해주세요"
                autoFocus
                className={`
              text-lg font-medium text-basic w-full
              placeholder:text-slate-400 outline-none
              `}
              />
              <div className="flex text-xs font-medium px-1 py-[2px]">
                <span className={errors.title ? "text-error" : ""}>
                  {watch("title")?.length ? watch("title").length : 0}
                </span>
                <span className="text-blue-500">{"/30"}</span>
              </div>
            </div>
            <p className="text-error">{errors.title && errors.title.message}</p>
            <div className="rounded-[20px] bg-slate-200 flex items-center gap-2 p-2">
              <Image
                className="bg-blue-500 rounded-full cursor-pointer p-1 w-6 h-6"
                src="/icons/link-imbed.svg"
                alt="링크 임베드 버튼"
                width={24}
                height={24}
              />
              <span className="text-base font-normal text-basic hover:text-blue-500 truncate cursor-default">
                {getValues("linkUrl")
                  ? errors.linkUrl
                    ? errors.linkUrl.message
                    : getValues("linkUrl")
                  : "참고할 콘텐츠의 링크를 넣어주세요"}
              </span>
            </div>
            <DefaultEditor
              setEditorState={setEditorState}
              editorState={editorState}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  )
}
