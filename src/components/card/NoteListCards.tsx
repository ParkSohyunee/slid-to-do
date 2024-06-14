import Image from "next/image"
import { useRouter } from "next/router"
import { MouseEvent, useRef } from "react"

import { useDetectClose } from "@/hooks/useDetectClose"
import useToggle from "@/hooks/useToggle"
import { CardAboutNoteList } from "@/types/note"
import RightSidebarContainer from "@/components/modal/RightSidebarContainer"
import DetailNote from "@/components/DetailNote"

type NoteListCardsProps = {
  note: CardAboutNoteList
}

type PopupMenuProps = {
  onClickEdit: (e: MouseEvent<HTMLButtonElement>) => void
  onClickDelete: () => void
}

function PopupMenu({ onClickEdit, onClickDelete }: PopupMenuProps) {
  return (
    <div
      className={`
        absolute right-0 top-1/2 translate-y-1/4
        flex flex-col 
        rounded-sm shadow-lg 
        text-sm font-normal text-slate-700 
        bg-white z-10`}
    >
      <button
        onClick={onClickEdit}
        className="rounded-t-sm px-4 pt-2 pb-[6px] hover:bg-slate-50"
      >
        수정하기
      </button>
      <button
        onClick={onClickDelete}
        className="rounded-b-sm px-4 pb-2 pt-[6px] hover:bg-slate-50"
      >
        삭제하기
      </button>
    </div>
  )
}

export default function NoteListCards({ note }: NoteListCardsProps) {
  const router = useRouter()
  const rightSidebar = useToggle()
  const popupRef = useRef(null)
  const { isOpen: popupIsOpen, toggleHandler } = useDetectClose({
    ref: popupRef,
  })
  const {
    id: noteId,
    todo: { id, title, done },
    goal,
  } = note
  const simpleTodo = { id, title, done, goal }

  const handlePopupMenu = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    toggleHandler()
  }

  const handleMoveToEditPage = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    router.push(`/goal/${goal.id}/notes/${note.id}/edit`)
  }

  return (
    <>
      {rightSidebar.isOpen && (
        <RightSidebarContainer onClickClose={rightSidebar.close}>
          <DetailNote todo={simpleTodo} noteId={noteId} />
        </RightSidebarContainer>
      )}
      <div
        onClick={rightSidebar.open}
        className="bg-white p-6 rounded-sm border border-slate-100 flex flex-col gap-4 cursor-pointer hover:shadow-xl"
      >
        <div className="relative flex justify-between items-center">
          <div className="bg-blue-100 rounded-[8px] w-[28px] h-[28px] px-[6px] py-[7px]">
            <Image
              src="/icons/note-list.svg"
              alt="노트 리스트"
              width={18}
              height={18}
            />
          </div>
          <button
            ref={popupRef}
            onClick={handlePopupMenu}
            className="bg-slate-50 rounded-full w-6 h-6 p-[5px]"
          >
            <Image
              src="/icons/meatballs-menu.svg"
              alt="노트 수정 및 삭제 버튼"
              width={14}
              height={14}
            />
          </button>
          {popupIsOpen && (
            <PopupMenu
              onClickEdit={handleMoveToEditPage}
              onClickDelete={() => {}}
            />
          )}
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-basic">{note.title}</p>
          <div className="h-[1px] bg-slate-200"></div>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              {note.todo.done ? "Done" : "To do"}
            </span>
            <span className="text-xs font-normal text-slate-700">
              {note.todo.title}
            </span>
          </div>
        </div>
      </div>
    </>
  )
}
