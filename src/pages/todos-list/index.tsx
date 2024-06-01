/**
 * TODO
 * [x] 모든 할 일 조회 API 연동
 * [ ] 카테고리 컴포넌트 구현
 * [x] 카테고리 클릭 시 API 쿼리 로직
 * [ ] 수정, 삭제 팝업 메뉴
 * [ ] 노트보기 클릭시 우측 노트 사이드메뉴
 * [ ] 무한스크롤 기능
 * [ ] 반응형 UI
 */
import Image from "next/image"
import { MouseEvent, useState } from "react"
import { useQuery } from "@tanstack/react-query"

import getAllTodos from "@/pages/api/todos/getAllTodos"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import TodoItem from "@/components/item/TodoItem"

const DEFAULT_VALUE = "All"

export default function TodosPage() {
  const [selectedCategory, setSelectedCategory] = useState(DEFAULT_VALUE)
  const [isDone, setIsDone] = useState(false)
  const { data, isLoading } = useQuery({
    queryKey:
      selectedCategory === DEFAULT_VALUE
        ? [QUERY_KEYS.getAllTodos]
        : [QUERY_KEYS.getAllTodos, isDone],
    queryFn: () =>
      selectedCategory === DEFAULT_VALUE
        ? getAllTodos()
        : getAllTodos({
            done: isDone,
          }),
    staleTime: 1000 * 60 * 5,
  })

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
    <section className="h-full max-w-[792px] flex flex-col">
      <div className="flex justify-between items-center self-stretch mb-4">
        <h1 className="text-lg font-semibold text-slate-900">
          모든 할 일 {data?.totalCount ? `(${data.totalCount})` : ""}
        </h1>
        <button className="flex gap-1 items-center">
          <Image
            src="/icons/plus-blue-small.svg"
            alt="할 일 추가 버튼"
            width={16}
            height={16}
          />
          <span className="text-sm font-semibold text-blue-500">할일 추가</span>
        </button>
      </div>
      <div className="rounded-sm border border-slate-100 bg-white p-6 grow flex flex-col gap-4">
        <div className="flex gap-2" onClick={handleTodoListOfStatus}>
          <button className="px-3 py-1 rounded-[17px] border text-sm font-medium">
            All
          </button>
          <button className="px-3 py-1 rounded-[17px] border text-sm font-medium">
            To do
          </button>
          <button className="px-3 py-1 rounded-[17px] border text-sm font-medium">
            Done
          </button>
        </div>
        {isLoading ? (
          <div>로딩 중</div>
        ) : data?.todos ? (
          <ul className="flex flex-col justify-between gap-2 overflow-auto">
            {data.todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        ) : (
          <div>데이터가 없어요.</div>
        )}
      </div>
    </section>
  )
}
