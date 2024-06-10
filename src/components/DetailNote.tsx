import Image from "next/image"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { EditorState, convertFromRaw } from "draft-js"
import { useQuery } from "@tanstack/react-query"

import { Todo } from "@/types/todos"
import getDateFormat from "@/libs/utils/getDateFormat"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getNoteDetail from "@/pages/api/note/getNoteDetail"
import { NoteDetail } from "@/types/note"

type DetailNoteProps = {
  todo: Todo
}

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export default function DetailNote({ todo }: DetailNoteProps) {
  const { done, goal, title, noteId } = todo

  const { data: note, isLoading } = useQuery<NoteDetail>({
    queryKey: [QUERY_KEYS.getNoteDetail, noteId],
    queryFn: () => getNoteDetail(noteId),
    staleTime: 1000 * 60 * 5,
    enabled: !!noteId,
  })

  /** editor state */
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty(),
  )

  /** 노트 내용을 에디터로 보여주기 */
  useEffect(() => {
    if (note) {
      const contentState = convertFromRaw(JSON.parse(note.content))
      const newEditorState = EditorState.createWithContent(contentState)
      setEditorState(newEditorState)
    }
  }, [note])

  if (isLoading) {
    return <div>로딩중</div> // TODO 스켈레톤 UI로 변경하기
  }

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex flex-col gap-3">
        {goal && (
          <h3 className="flex gap-[6px] text-base font-medium text-basic items-center">
            <Image
              className="w-6 h-6 rounded-[6px] bg-slate-800 p-1"
              src="/icons/flag-white.svg"
              alt="목표"
              width={16}
              height={16}
            />
            {goal.title}
          </h3>
        )}
        <div className="flex items-center justify-between">
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              {done ? "Done" : "To do"}
            </span>
            <span className="text-sm font-normal text-slate-700">{title}</span>
          </div>
          <span className="text-xs font-normal text-slate-500">
            {getDateFormat(note?.createdAt as string)}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="pt-3 pb-3 border-t border-b border-slate-200 flex items-center justify-between">
          <p className="text-lg font-medium text-basic w-full">{note?.title}</p>
        </div>
        <Editor readOnly onChange={setEditorState} editorState={editorState} />
      </div>
    </div>
  )
}
