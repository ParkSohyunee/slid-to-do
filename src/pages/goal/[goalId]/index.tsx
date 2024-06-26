import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { useMemo } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

import GoalDetailCard from "@/components/GoalDetailCard"
import TodoItem from "@/components/item/TodoItem"
import ModalContainer from "@/components/modal/ModalContainer"
import CreateTodos from "@/components/CreateTodos"
import {
  ItemSkeleton,
  Skeleton,
  WhiteBgSkeleton,
} from "@/components/ui/Skeleton"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"
import useToggle from "@/hooks/useToggle"
import { AllTodos } from "@/types/todos"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

export default function GoalDetailPage() {
  const createTodoModal = useToggle()
  const router = useRouter()
  const goalId = Number(router.query.goalId)
  const isDone = [false, true]

  /**
   * 기존 useQueries를 사용하여 두개의 쿼리를 불러오는 방법에서
   * 무한스크롤을 적용하면서 각각의 쿼리를 불러오는 방법으로 수정 */
  const {
    data: todoList,
    isLoading: todoListLoading,
    hasNextPage: todoListHasNextPage,
    isFetchingNextPage: todoListIsFetchingNextPage,
    fetchNextPage: todoListFetchNextPage,
  } = useInfiniteQuery<AllTodos>({
    queryKey: [QUERY_KEYS.getAllTodosInfinite, goalId, false],
    queryFn: ({ pageParam }) =>
      getAllTodos({
        goalId,
        cursor: pageParam as number,
        size: 10,
        done: false,
      }),
    initialPageParam: null,
    getNextPageParam: ({ nextCursor }) => (nextCursor ? nextCursor : null),
    staleTime: 1000 * 60 * 5,
    enabled: !!goalId,
  })

  const {
    data: doneList,
    isLoading: doneListLoading,
    hasNextPage: doneListHasNextPage,
    isFetchingNextPage: doneListIsFetchingNextPage,
    fetchNextPage: doneListFetchNextPage,
  } = useInfiniteQuery<AllTodos>({
    queryKey: [QUERY_KEYS.getAllTodosInfinite, goalId, true],
    queryFn: ({ pageParam }) =>
      getAllTodos({
        goalId,
        cursor: pageParam as number,
        size: 10,
        done: true,
      }),
    initialPageParam: null,
    getNextPageParam: ({ nextCursor }) => (nextCursor ? nextCursor : null),
    staleTime: 1000 * 60 * 5,
    enabled: !!goalId,
  })

  const todoListRef = useIntersectionObserver(() => {
    if (todoListHasNextPage && !todoListIsFetchingNextPage) {
      todoListFetchNextPage()
    }
  })

  const doneListRef = useIntersectionObserver(() => {
    if (doneListHasNextPage && !doneListIsFetchingNextPage) {
      doneListFetchNextPage()
    }
  })

  const todoLists = useMemo(() => {
    return todoList ? todoList.pages.flatMap((data) => data.todos) : []
  }, [todoList])

  const doneLists = useMemo(() => {
    return doneList ? doneList.pages.flatMap((data) => data.todos) : []
  }, [doneList])

  return (
    <>
      {createTodoModal.isOpen && (
        <ModalContainer onClose={createTodoModal.close}>
          <CreateTodos onClose={createTodoModal.close} />
        </ModalContainer>
      )}
      <section className="h-full max-w-1200 flex flex-col">
        <h1 className="mb-4 text-lg font-semibold text-slate-900">목표</h1>
        <div className="flex flex-col gap-4 tablet:gap-6 h-full">
          <GoalDetailCard goalId={goalId} />
          <Link
            href={`/goal/${goalId}/notes`}
            className="
          flex items-center justify-between
          bg-blue-100 px-6 py-4 border border-bule-100 rounded-sm
          cursor-pointer hover:shadow-2xl
          "
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/note.svg"
                alt="노트 모아보기"
                width={24}
                height={24}
              />
              <h3 className="text-lg font-bold text-basic">노트 모아보기</h3>
            </div>
            <Image
              src="/icons/arrow-right.svg"
              alt="노트 모아보기 버튼"
              width={24}
              height={24}
            />
          </Link>
          <div className="grid gap-4 tablet:gap-6 grid-cols-1 tablet:grid-cols-2">
            {isDone.map((value, index) => (
              <ul
                key={index}
                className={`
              px-6 py-4 rounded-sm border h-[228px] hover:shadow-2xl
              ${index === 0 ? "bg-white border-slate-100" : "bg-slate-200 border-slate-100"}
              flex flex-col gap-4
            `}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-bold text-basic">
                    {value ? "Done" : "To do"}
                  </h3>
                  {!value && (
                    <button
                      onClick={createTodoModal.open}
                      className="flex gap-1 items-center"
                    >
                      <Image
                        src="/icons/plus-blue-small.svg"
                        alt="할 일 추가 버튼"
                        width={16}
                        height={16}
                      />
                      <span className="text-sm font-semibold text-blue-500">
                        할일 추가
                      </span>
                    </button>
                  )}
                </div>
                {value ? (
                  // done
                  doneListLoading ? (
                    <ItemSkeleton />
                  ) : doneLists.length !== 0 ? (
                    <div className="flex flex-col items-start gap-2 self-stretch overflow-scroll">
                      {doneLists.map((todo) => (
                        <TodoItem todo={todo} key={todo.id} />
                      ))}
                      {doneListIsFetchingNextPage && (
                        <div className="space-y-2 w-full">
                          <WhiteBgSkeleton className="h-4 w-2/3" />
                          <WhiteBgSkeleton className="h-4 w-1/2" />
                        </div>
                      )}
                      <div ref={doneListRef} className="h-[1px]"></div>
                    </div>
                  ) : (
                    <p className="text-sm font-normal text-slate-500 text-center flex items-center justify-center h-full">
                      아직 다 한 일이 없어요
                    </p>
                  )
                ) : // todo
                todoListLoading ? (
                  <ItemSkeleton />
                ) : todoLists.length !== 0 ? (
                  <div className="flex flex-col items-start gap-2 self-stretch overflow-scroll">
                    {todoLists.map((todo) => (
                      <TodoItem todo={todo} key={todo.id} />
                    ))}
                    {todoListIsFetchingNextPage && (
                      <div className="space-y-2 w-full">
                        <Skeleton className="h-4 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                      </div>
                    )}
                    <div ref={todoListRef} className="h-[1px]"></div>
                  </div>
                ) : (
                  <p className="text-sm font-normal text-slate-500 text-center flex items-center justify-center h-full">
                    아직 해야할 일이 없어요
                  </p>
                )}
              </ul>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
