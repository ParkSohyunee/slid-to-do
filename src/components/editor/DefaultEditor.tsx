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
    <>
      <button onMouseDown={toggleInlineStyle("BOLD")}>Bold</button>
      <button onMouseDown={toggleInlineStyle("ITALIC")}>Italic</button>
      <Editor
        editorState={editorState}
        onChange={setEditorState}
        placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
      />
    </>
  )
}
