import Image from "next/image"
import { Dispatch, MouseEvent, SetStateAction } from "react"
import { EditorState, RichUtils, convertToRaw } from "draft-js"
import dynamic from "next/dynamic"
import { UseFormSetValue, UseFormTrigger } from "react-hook-form"

import { NoteFormData } from "@/types/note"

type DefaultEditorProps = {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
  trigger: UseFormTrigger<NoteFormData>
  setValue: UseFormSetValue<NoteFormData>
}

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export default function DefaultEditor({
  editorState,
  setEditorState,
  trigger,
  setValue,
}: DefaultEditorProps) {
  /** 노트 에디터 onChange 이벤트 핸들러 */
  const handleChangeEditor = (e: EditorState) => {
    setEditorState(e)

    const contentState = editorState.getCurrentContent() // editor의 현재 contents를 반환
    const raw = convertToRaw(contentState) // convert ContentState Object to a raw structure

    // register로 등록하지 않고, react-hook-form 값으로 넣어주기
    setValue("content", JSON.stringify(raw))
    trigger("content")
  }

  const toggleInlineStyle = (type: string) => (e: MouseEvent) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, type))
  }

  return (
    <div className="flex flex-col gap-4 justify-between grow">
      <div className="grow flex flex-col gap-2">
        <p className="text-xs font-medium text-basic">
          {`공백포함 : 총 ${editorState.getCurrentContent().getPlainText("").length}자 
          | 공백제외 : 총 ${
            editorState
              .getCurrentContent()
              .getPlainText("")
              .trim()
              .split(" ")
              .join("").length
          }자`}
        </p>
        <Editor
          editorState={editorState}
          onChange={handleChangeEditor}
          placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
        />
      </div>
      <div className="flex py-[10px] px-4 items-start gap-4 rounded-[21.5px] border border-slate-200 shadow-sm">
        <div className="flex gap-1">
          <button type="button" onMouseDown={toggleInlineStyle("BOLD")}>
            <Image
              src="/icons/editor-bold.svg"
              alt="bold"
              width={24}
              height={24}
            />
          </button>
          <button type="button" onMouseDown={toggleInlineStyle("ITALIC")}>
            <Image
              src="/icons/editor-italic.svg"
              alt="italic"
              width={24}
              height={24}
            />
          </button>
          <button type="button" onMouseDown={toggleInlineStyle("UNDERLINE")}>
            <Image
              src="/icons/editor-underline.svg"
              alt="underline"
              width={24}
              height={24}
            />
          </button>
        </div>
      </div>
    </div>
  )
}
