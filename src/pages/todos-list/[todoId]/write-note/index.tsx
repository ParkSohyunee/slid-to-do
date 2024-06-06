import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useState } from "react"
import { EditorState, convertFromRaw, convertToRaw } from "draft-js"
import { useForm } from "react-hook-form"

import DefaultEditor from "@/components/editor/DefaultEditor"
import { noteTitleValidationRules } from "@/libs/utils/formInputValidationRules"
import { NoteFormData } from "@/types/note"
// import axiosInstance from "@/libs/axios/axiosInstance"

export default function WriteNoteForTodoPage() {
  const router = useRouter()
  const { title: todoTitle, done, goal: goalTitle, todoId } = router.query

  const {
    register,
    formState: { errors },
    watch,
    handleSubmit,
    trigger,
    setValue,
    getValues,
  } = useForm<NoteFormData>({ mode: "onBlur" }) // TODO useContextForm 사용해서 리팩토링 하기

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 노트 작성하기 */
  const onSubmitNote = async (data: NoteFormData) => {
    /** 서버측에서 API 확인 중으로 로직만 구현하고 추후 test 진행 예정으로 코드 주석처리 해둠 */
    // try {
    //   await axiosInstance.post("/notes", {
    //     todoId: Number(todoId),
    //     title: data.title,
    //     content: data.content,
    //     linkUrl: "",
    //   })
    // } catch (error) {
    //   console.log(error)
    // }
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
    alert("임시 저장되었습니다.")
  }

  /** 임시 저장된 데이터가 있다면 불러오기 */
  useEffect(() => {
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
  }, [todoId, setValue])

  return (
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
            className="text-sm font-semibold text-white py-3 px-6 rounded-sm bg-slate-400"
          >
            작성 완료
          </button>
        </div>
      </div>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
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
          <div className="flex gap-2 items-center">
            <div className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              {done ? "Done" : "To do"}
            </div>
            <span className="text-sm font-normal text-slate-700">
              {todoTitle}
            </span>
          </div>
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
          <DefaultEditor
            setEditorState={setEditorState}
            editorState={editorState}
            trigger={trigger}
            setValue={setValue}
          />
        </div>
      </div>
    </form>
  )
}
