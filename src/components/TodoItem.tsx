import { useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BeatLoader } from "react-spinners"

import { useDetectClose } from "@/hooks/useDetectClose"
import useToggle from "@/hooks/useToggle"
import { useToast } from "@/hooks/useToast"

import deleteTodo from "@/pages/api/todos/deleteTodo"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import { Todo } from "@/types/todos"

import ModalContainer from "./modal/ModalContainer"
import PopupContainer from "./modal/PopupContainer"
import RightSidebarContainer from "./modal/RightSidebarContainer"
import DetailNote from "./DetailNote"
import CreateTodos from "./CreateTodos"
import PopupMenu from "./popup/PopupMenu"

type TodoItemProps = {
  todo: Todo
}

export default function TodoItem({ todo }: TodoItemProps) {
  const queryClient = useQueryClient()
  const popupRef = useRef(null)
  const { isOpen: popupIsOpen, toggleHandler } = useDetectClose({
    ref: popupRef,
  })
  const editTodoModal = useToggle()
  const confirmModal = useToggle()
  const rightSidebar = useToggle()
  const { toast } = useToast()

  const { goal, id, title, done } = todo
  const simpleTodo = { id, title, done, goal }

  const deleteTodoMutation = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllTodos],
      })
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.getAllTodosInfinite],
      })
      confirmModal.close()
    },
    onSettled: () => {
      toast({
        title: "✅ 성공적으로 삭제 되었어요.",
      })
    },
  })

  return (
    <>
      {editTodoModal.isOpen && (
        <ModalContainer onClose={editTodoModal.close}>
          <CreateTodos onClose={editTodoModal.close} edit={true} todo={todo} />
        </ModalContainer>
      )}
      {confirmModal.isOpen &&
        (deleteTodoMutation.isPending ? (
          <BeatLoader
            color="#3B82F6"
            className="absolute top-1/2 right-1/2 translate-x-1/2 z-10"
          />
        ) : (
          <PopupContainer
            onClickClose={confirmModal.close}
            onClick={() => deleteTodoMutation.mutate(todo.id)}
          >
            <p className="text-center text-base font-medium text-basic">
              <div className="text-center">할 일을 삭제할까요?</div>
            </p>
          </PopupContainer>
        ))}
      {rightSidebar.isOpen && (
        <RightSidebarContainer onClickClose={rightSidebar.close}>
          <DetailNote todo={simpleTodo} noteId={todo.noteId} />
        </RightSidebarContainer>
      )}
      <li
        className={`
      text-sm font-normal text-basic relative 
      flex items-center justify-between group py-1
      `}
      >
        <div
          className={`flex gap-2 ${todo.goal ? "items-start" : "items-center"}`}
        >
          <Image
            src={
              todo.done
                ? "/icons/checkbox-active.svg"
                : "/icons/checkbox-inactive.svg"
            }
            alt="할 일 완료 여부"
            width={24}
            height={24}
          />
          <div className="flex flex-col gap-1">
            <p
              className={`
            ${todo.done && "line-through"} 
            group-hover:text-blue-500 
            transition-all duration-300
            `}
            >
              {todo.title}
            </p>
            {todo.goal && (
              <p className="flex gap-1 items-center text-slate-70 group-hover:text-blue-500">
                <Image
                  src="/icons/goal.svg"
                  alt="목표"
                  width={24}
                  height={24}
                />
                {todo.goal.title}
              </p>
            )}
          </div>
        </div>
        <div
          className={`
        flex gap-[10px] opacity-0 group-hover:opacity-100
        transition-opacity duration-300`}
        >
          {todo.noteId ? (
            <div
              onClick={rightSidebar.open}
              className="bg-slate-50 rounded-full w-6 h-6 cursor-pointer"
            >
              <Image
                src="/icons/note-view.svg"
                alt="노트 보기"
                width={24}
                height={24}
              />
            </div>
          ) : (
            <Link
              href={{
                pathname: `todos-list/${todo.id}/write-note`,
                query: {
                  title: todo.title,
                  done: todo.done,
                  goal: todo.goal ? todo.goal.title : "",
                },
              }}
              className="bg-slate-50 rounded-full w-6 h-6 cursor-pointer"
            >
              <Image
                src="/icons/note-write.svg"
                alt="노트 작성하기"
                width={24}
                height={24}
              />
            </Link>
          )}
          <div
            ref={popupRef}
            onClick={toggleHandler}
            className="bg-slate-50 rounded-full w-6 h-6 p-[5px] cursor-pointer"
          >
            <Image
              src="/icons/meatballs-menu.svg"
              alt="할 일 수정 및 삭제 버튼"
              width={14}
              height={14}
            />
          </div>
          {popupIsOpen && (
            <PopupMenu
              onClickEdit={editTodoModal.open}
              onClickDelete={confirmModal.open}
            />
          )}
        </div>
      </li>
    </>
  )
}
