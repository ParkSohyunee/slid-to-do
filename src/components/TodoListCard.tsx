import Image from "next/image"
import Link from "next/link"
import { MouseEvent, MutableRefObject, useRef } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { BeatLoader } from "react-spinners"

import { Todo } from "@/types/todos"
import { useDetectClose } from "@/hooks/useDetectClose"
import { useToast } from "@/hooks/useToast"
import useToggle from "@/hooks/useToggle"
import deleteTodo from "@/pages/api/todos/deleteTodo"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"

import RightSidebarContainer from "./modal/RightSidebarContainer"
import PopupContainer from "./modal/PopupContainer"
import DetailNote from "./DetailNote"
import ModalContainer from "./modal/ModalContainer"
import CreateTodos from "./CreateTodos"
import { Skeleton } from "./ui/Skeleton"

type TodoListCardProps = {
  handleTodoListOfStatus: (e: MouseEvent<HTMLDivElement>) => void
  selectedCategory: string
  todos?: Todo[]
  isLoading: boolean
  observerRef: MutableRefObject<null>
  isFetchingNextPage: boolean
}

type TodoItemProps = {
  todo: Todo
}

type PopupMenuProps = {
  onClickEdit: () => void
  onClickDelete: () => void
}

const STATUS_OF_TODO = ["All", "To do", "Done"]

function PopupMenu({ onClickEdit, onClickDelete }: PopupMenuProps) {
  return (
    <div
      className={`
        absolute right-0 top-1/2 translate-y-1/4
        flex flex-col border border-slate-100
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

function TodoItem({ todo }: TodoItemProps) {
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

export default function TodoListCard({
  handleTodoListOfStatus,
  selectedCategory,
  todos,
  isLoading,
  observerRef,
  isFetchingNextPage,
}: TodoListCardProps) {
  return (
    <div className="rounded-sm border border-slate-100 bg-white p-6 grow flex flex-col gap-4">
      <div className="flex gap-2" onClick={handleTodoListOfStatus}>
        {STATUS_OF_TODO.map((status) => (
          <button
            key={status}
            className={`
            px-3 py-1 rounded-[17px] border text-sm font-medium
            ${
              status === selectedCategory
                ? "text-white border-blue-500 bg-blue-500"
                : "text-basic border-slate-200"
            }
            `}
          >
            {status}
          </button>
        ))}
      </div>
      {isLoading ? (
        <BeatLoader
          color="#3B82F6"
          margin={4}
          className="flex justify-center grow items-center"
        />
      ) : todos && todos?.length > 0 ? (
        <ul className="flex flex-col justify-between gap-1 grow">
          {todos.map((todo) => (
            <TodoItem key={todo.id} todo={todo} />
          ))}
          {isFetchingNextPage && (
            <div className="space-y-2 w-full">
              <Skeleton className="h-5 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          )}
          <div ref={observerRef} className="h-[2px]"></div>
        </ul>
      ) : (
        <div className="flex items-center justify-center text-sm font-normal text-slate-500 grow">
          {selectedCategory === "All"
            ? "등록한 일이 없어요"
            : selectedCategory === "To do"
              ? "해야할 일이 아직 없어요"
              : "다 한 일이 아직 없어요"}
        </div>
      )}
    </div>
  )
}
