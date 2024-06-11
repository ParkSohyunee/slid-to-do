import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import { EditorState, convertFromRaw } from "draft-js"
import { useQuery } from "@tanstack/react-query"

import { SimpleTodo } from "@/types/todos"
import getDateFormat from "@/libs/utils/getDateFormat"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getNoteDetail from "@/pages/api/note/getNoteDetail"
import { NoteDetail } from "@/types/note"

type DetailNoteProps = {
  todo: SimpleTodo
  noteId: number
}

const Editor = dynamic(() => import("draft-js").then((mod) => mod.Editor), {
  ssr: false,
})

export default function DetailNote({ todo, noteId }: DetailNoteProps) {
  const [visibleLink, setVisibleLink] = useState(true)
  const { done, goal, title } = todo

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
        {note?.linkUrl && visibleLink && (
          <div className="rounded-[20px] bg-slate-200 flex justify-between items-center py-1 px-4 gap-1">
            <Link
              className="text-base font-normal text-basic hover:text-blue-500 truncate"
              href={note.linkUrl}
              target="_blank"
            >
              {note.linkUrl}
            </Link>
            <Image
              onClick={() => setVisibleLink(false)}
              className="bg-slate-500 rounded-full rotate-45 cursor-pointer"
              src="/icons/close-small-white.svg"
              alt="닫기 버튼"
              width={18}
              height={18}
            />
          </div>
        )}
        <Editor readOnly onChange={setEditorState} editorState={editorState} />
      </div>
    </div>
  )
}
