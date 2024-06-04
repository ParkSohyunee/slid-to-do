import { useState } from "react"
import { Editor, EditorState } from "draft-js"

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
