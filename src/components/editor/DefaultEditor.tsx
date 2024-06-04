import { useState } from "react"
import { EditorState } from "draft-js"
import dynamic from "next/dynamic"

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export default function DefaultEditor() {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  console.log(editorState)

  return (
    <Editor
      editorState={editorState}
      onChange={setEditorState}
      placeholder="이 곳을 클릭해 노트 작성을 시작해주세요"
    />
  )
}
