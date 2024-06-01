/**
 * TODO
 * [ ] 모든 할 일 조회 API 연동
 * [ ] 카테고리 컴포넌트 구현
 * [ ] 카테고리 클릭 시 API 쿼리 로직
 * [ ] 수정, 삭제 팝업 메뉴
 * [ ] 노트보기 클릭시 우측 노트 사이드메뉴
 * [ ] 무한스크롤 기능
 * [ ] 반응형 UI
 */
import Image from "next/image"
import { useQuery } from "@tanstack/react-query"

import getAllTodos from "@/pages/api/todos/getAllTodos"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import TodoItem from "@/components/item/TodoItem"

export default function TodosPage() {
  const { data, isLoading } = useQuery({
    queryKey: [QUERY_KEYS.getAllTodos],
    queryFn: () => getAllTodos(),
    staleTime: 1000 * 60 * 5,
  })

  console.log(data)

  return (
    <section className="h-full max-w-[792px] flex flex-col">
      <div className="flex justify-between items-center self-stretch mb-4">
        <h1 className="text-lg font-semibold text-slate-900">
          모든 할 일 ({data?.totalCount})
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
        <div>카테고리</div>
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
