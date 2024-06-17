/**
 * TODO
 * [x] 모든 할 일 조회 API 연동
 * [x] 카테고리(필터링) 컴포넌트 구현
 * [x] 카테고리 클릭 시 API 쿼리 로직
 * [x] 수정, 삭제 팝업 메뉴
 * [ ] 수정, 삭제 기능
 * [x] 노트보기 클릭시 우측 노트 사이드메뉴
 * [ ] 무한스크롤 기능
 * [ ] 반응형 UI
 */
import Image from "next/image"
import { MouseEvent, useMemo, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"

import getAllTodos from "@/pages/api/todos/getAllTodos"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import TodoListCard from "@/components/TodoListCard"
import ModalContainer from "@/components/modal/ModalContainer"
import CreateTodos from "@/components/CreateTodos"
import useToggle from "@/hooks/useToggle"
import { AllTodos } from "@/types/todos"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

const DEFAULT_VALUE = "All"

export default function TodosPage() {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_VALUE)
  const [isDone, setIsDone] = useState(false)
  const createTodoModal = useToggle()
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<AllTodos>({
      queryKey:
        selectedCategory === DEFAULT_VALUE
          ? [QUERY_KEYS.getAllTodosInfinite]
          : [QUERY_KEYS.getAllTodosInfinite, isDone],
      queryFn: ({ pageParam }) =>
        selectedCategory === DEFAULT_VALUE
          ? getAllTodos({
              cursor: pageParam as number,
              size: 10,
            })
          : getAllTodos({
              cursor: pageParam as number,
              size: 10,
              done: isDone,
            }),
      initialPageParam: null,
      getNextPageParam: ({ nextCursor }) => (nextCursor ? nextCursor : null),
      staleTime: 1000 * 60 * 5,
    })

  const ref = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const todos = useMemo(() => {
    return data ? data.pages.flatMap((data) => data.todos) : []
  }, [data])

  /** todo 상태를 필터링해서 보여주는 이벤트 핸들러  */
  const handleTodoListOfStatus = (e: MouseEvent<HTMLDivElement>) => {
    if (e.currentTarget === e.target) {
      return
    }
    const status = (e.target as HTMLButtonElement).textContent as string
    setSelectedCategory(status)

    if (status === "Done") {
      setIsDone(true)
    } else {
      setIsDone(false)
    }
  }

  return (
    <>
      {createTodoModal.isOpen && (
        <ModalContainer onClose={createTodoModal.close}>
          <CreateTodos onClose={createTodoModal.close} />
        </ModalContainer>
      )}
      <section className="h-full max-w-[792px] flex flex-col">
        <div className="flex justify-between items-center self-stretch mb-4">
          <h1 className="text-lg font-semibold text-slate-900">
            모든 할 일{data ? `(${data.pages[0].totalCount})` : ""}
          </h1>
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
        </div>
        <TodoListCard
          todos={todos}
          isLoading={isLoading}
          handleTodoListOfStatus={handleTodoListOfStatus}
          selectedCategory={selectedCategory}
          observerRef={ref}
          isFetchingNextPage={isFetchingNextPage}
        />
      </section>
    </>
  )
}
