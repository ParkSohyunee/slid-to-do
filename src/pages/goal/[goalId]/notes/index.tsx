import Image from "next/image"
import { useRouter } from "next/router"
import { useEffect, useMemo } from "react"
import { useInfiniteQuery, useQueryClient } from "@tanstack/react-query"

import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getNoteList from "@/pages/api/note/getNoteList"
import { NoteList } from "@/types/note"
import NoteListCards from "@/components/card/NoteListCards"
import useIntersectionObserver from "@/hooks/useIntersectionObserver"

export default function NoteListAboutGoalPage() {
  const queryClient = useQueryClient()
  const { query } = useRouter()
  const goalId = Number(query.goalId)

  const { data, hasNextPage, isLoading, isFetchingNextPage, fetchNextPage } =
    useInfiniteQuery<NoteList>({
      queryKey: [QUERY_KEYS.getNoteList, goalId],
      queryFn: ({ pageParam }) =>
        getNoteList({
          goalId,
          size: 5,
          cursor: pageParam as number,
        }),
      getNextPageParam: ({ nextCursor }) => (nextCursor ? nextCursor : null),
      initialPageParam: null,
      enabled: !!goalId,
      staleTime: 1000 * 60 * 5,
    })

  const ref = useIntersectionObserver(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage()
    }
  })

  const notes = useMemo(() => {
    return data ? data?.pages.flatMap((data) => data.notes) : []
  }, [data])

  /** 마운트 될 때 기존 캐시를 삭제하여 무한스크롤이 실행되도록 */
  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: [QUERY_KEYS.getNoteList, goalId] })
    }
  }, [goalId, queryClient])

  return (
    <section className="h-full max-w-1200 flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-slate-900">노트 모아보기</h1>
      <div className="flex gap-2 items-center bg-white rounded-sm border border-slate-100 py-[14px] px-6">
        <Image
          className="w-6 h-6 rounded-[8px] bg-slate-800 p-[4.8px]"
          src="/icons/flag-white.svg"
          alt="목표"
          width={24}
          height={24}
        />
        <h3 className="text-sm font-semibold text-basic">
          {notes[0]?.goal.title}
        </h3>
      </div>
      {isLoading ? (
        <div className="text-sm font-normal text-slate-500 h-full flex items-center justify-center">
          로딩 중
        </div>
      ) : notes && notes.length > 0 ? (
        <>
          {notes.map((note) => (
            <NoteListCards key={note.id} note={note} />
          ))}
          <div ref={ref} className="h-[1px]"></div>
          {isFetchingNextPage && <div>로딩중</div>}
        </>
      ) : (
        <div className="text-sm font-normal text-slate-500 h-full flex items-center justify-center">
          아직 등록된 노트가 없어요
        </div>
      )}
    </section>
  )
}
