import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { EditorState } from "draft-js"
import { useForm } from "react-hook-form"

import DefaultEditor from "@/components/editor/DefaultEditor"
import { noteTitleValidationRules } from "@/libs/utils/formInputValidationRules"
import { NoteFormData } from "@/types/note"

export default function EditNotePage() {
  const router = useRouter()
  const { noteId } = router.query

  const {
    register,
    formState: { errors, isValid },
    watch,
    handleSubmit,
    trigger,
    setValue,
  } = useForm<NoteFormData>({ mode: "onBlur" })

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 임시 저장하기 */
  const onClickSaveContents = () => {}

  /** 노트 수정하기 */
  const onEditNote = () => {}

  return (
    <form
      onSubmit={handleSubmit(onEditNote)}
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
          <h3 className="flex gap-[6px] text-base font-medium text-basic items-center">
            <Image
              className="w-6 h-6 rounded-[6px] bg-slate-800 p-1"
              src="/icons/flag-white.svg"
              alt="목표"
              width={16}
              height={16}
            />
            목표 제목
          </h3>
          <div className="flex gap-2 items-center">
            <div className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              To do
            </div>
            <span className="text-sm font-normal text-slate-700">
              할 일 제목
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
