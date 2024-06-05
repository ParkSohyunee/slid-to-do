import { Dispatch, MouseEvent, SetStateAction } from "react"
import { EditorState, Modifier, RichUtils } from "draft-js"
import dynamic from "next/dynamic"

type DefaultEditorProps = {
  editorState: EditorState
  setEditorState: Dispatch<SetStateAction<EditorState>>
}

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export const inlineStyles = ["BOLD", "ITALIC"]

export default function DefaultEditor({
  editorState,
  setEditorState,
}: DefaultEditorProps) {
  const toggleInlineStyle = (type: string) => (e: MouseEvent) => {
    e.preventDefault()
    setEditorState(RichUtils.toggleInlineStyle(editorState, type))
  }

  return (
    <div className="flex flex-col gap-4 justify-between grow">
      <div className="grow flex flex-col gap-2">
        <p>공백포함 : 979자 | 공백제외 : 총 754자</p>
        <Editor
          editorState={editorState}
          onChange={setEditorState}
          placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
        />
      </div>
      <div className="flex px-[10px] py-4 items-start gap-[10px] rounded-[21.5px] border border-slate-200 shadow-sm">
        <button onMouseDown={toggleInlineStyle("BOLD")}>Bold</button>
        <button onMouseDown={toggleInlineStyle("ITALIC")}>Italic</button>
      </div>
    </div>
  )
}
