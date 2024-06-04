import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { EditorState, convertToRaw } from "draft-js"

import DefaultEditor from "@/components/editor/DefaultEditor"

export default function WriteNoteForTodoPage() {
  const router = useRouter()
  const { title: todoTitle, done, goal: goalTitle } = router.query

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 에디터 콘텐츠를 로컬스토리지에 임시 저장하기 */
  const onClickSaveContents = () => {
    const contentState = editorState.getCurrentContent() // editor의 현재 contents를 반환
    const raw = convertToRaw(contentState) // convert ContentState Object to a raw structure
    localStorage.setItem("contents", JSON.stringify(raw))
  }

  return (
    <section className="h-full max-w-1200 flex flex-col bg-white">
      <div className="flex justify-between items-center">
        <h1 className="mb-4 text-lg font-semibold text-slate-900">노트 작성</h1>
        <div>
          <button onClick={onClickSaveContents}>임시저장</button>
          <button>작성 완료</button>
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
        <div>
          <DefaultEditor
            setEditorState={setEditorState}
            editorState={editorState}
          />
        </div>
      </div>
    </section>
  )
}
