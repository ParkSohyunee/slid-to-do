import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import { useQueries } from "@tanstack/react-query"

import GoalDetailCard from "@/components/GoalDetailCard"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"

/**
 * TODO
 * [ ] 각 할 일 카드 무한스크롤 적용
 */
export default function GoalDetailPage() {
  const router = useRouter()
  const goalId = Number(router.query.goalId)

  const isDone = [false, true]
  const results = useQueries({
    queries: isDone.map((done) => ({
      queryKey: [QUERY_KEYS.getAllTodos, goalId, done],
      queryFn: () =>
        getAllTodos({
          goalId,
          done,
        }),
      enabled: !!goalId,
      staleTime: 1000 * 60 * 5,
    })),
  })

  return (
    <section className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">목표</h1>
      <div className="flex flex-col gap-6 h-full">
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
        <div className="grid gap-6 grid-cols-2">
          {results.map(({ data, isLoading }, index) => (
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
                  {index === 0 ? "To do" : "Done"}
                </h3>
                {index === 0 && (
                  <button className="flex gap-1 items-center">
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
              {isLoading ? (
                <p className="text-sm font-normal text-slate-500 text-center flex items-center justify-center h-full">
                  로딩중
                </p>
              ) : data?.todos.length !== 0 ? (
                <div className="flex flex-col items-start gap-2 self-stretch">
                  {data?.todos.map((todo) => (
                    <li
                      key={todo.id}
                      className={`
                      text-sm font-normal text-basic 
                      flex items-center justify-between gap-2 
                      ${todo.done && "line-through"}
                      `}
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
                      {todo.title}
                      {todo.noteId && (
                        <Image
                          src="/icons/note-view.svg"
                          alt="할 일 완료 여부"
                          width={24}
                          height={24}
                        />
                      )}
                    </li>
                  ))}
                </div>
              ) : (
                <p className="text-sm font-normal text-slate-500 text-center flex items-center justify-center h-full">
                  {index === 0
                    ? "아직 해야할 일이 없어요"
                    : "아직 다 한 일이 없어요"}
                </p>
              )}
            </ul>
          ))}
        </div>
      </div>
    </section>
  )
}
