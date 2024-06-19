import { useMemo } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import { useInfiniteQuery } from "@tanstack/react-query"

import getGoalList from "@/pages/api/goal/getGoalList"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import TodosAboutGoalCard from "./TodosAboutGoalCard"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"
import { GoalList } from "@/types/goal"
import { CardSkeleton } from "./ui/Skeleton"

export default function TodosAboutGoalContainer() {
  const router = useRouter()
  const { data, isLoading, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<GoalList>({
      queryKey: [QUERY_KEYS.getGoalInfiniteList],
      queryFn: ({ pageParam }) =>
        getGoalList({
          cursor: pageParam as number,
          size: 3,
        }),
      initialPageParam: null,
      getNextPageParam: ({ nextCursor }) => (nextCursor ? nextCursor : null),
    })

  const ref = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const goalList = useMemo(() => {
    return data ? data.pages.flatMap((data) => data.goals) : []
  }, [data])

  return (
    <div
      className={`
        bg-white border border-slate-100 
        rounded-sm flex flex-col p-4 tablet:p-6
        `}
    >
      <div className="flex items-center justify-between pb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/todo-goals.svg"
            alt="최근 등록한 할 일"
            width={40}
            height={40}
          />
          <span className="text-base tablet:text-lg font-semibold text-basic">
            목표 별 할 일
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : goalList ? (
          <>
            {goalList.map((goal, index) => (
              <div
                key={goal.id}
                onClick={() => router.push(`/goal/${goal.id}`)}
                className={`
                p-6 rounded-md bg-blue-50 cursor-pointer
                flex flex-col items-center gap-4 hover:shadow-2xl
                ${(index + 1) % 3 === 0 && "lg:col-span-2"}
                `}
              >
                <TodosAboutGoalCard
                  key={goal.id}
                  goalId={goal.id}
                  title={goal.title}
                />
              </div>
            ))}
            {isFetchingNextPage && (
              <>
                <CardSkeleton />
                <CardSkeleton />
              </>
            )}
            <div ref={ref} className="h-[1px] lg:col-span-2"></div>
          </>
        ) : (
          <div
            className={`
          flex flex-col items-center justify-center 
          text-sm font-normal text-slate-500 h-full`}
          >
            등록한 목표가 없어요
          </div>
        )}
      </div>
    </div>
  )
}
