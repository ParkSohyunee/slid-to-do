import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getAllTodos from "@/pages/api/todos/getAllTodos"
import { useQueries } from "@tanstack/react-query"
import Image from "next/image"

type TodosAboutGoalCardProps = {
  goalId: number
  title: string
}

export default function TodosAboutGoalCard({
  goalId,
  title,
}: TodosAboutGoalCardProps) {
  const isDone = [true, false]
  const results = useQueries({
    queries: isDone.map((done) => ({
      queryKey: [QUERY_KEYS.getAllTodos, goalId, done],
      queryFn: () =>
        getAllTodos({
          goalId,
          done,
        }),
      enabled: !!goalId,
    })),
  })

  /**
   * TODO
   * - [x] 노트 아이콘 추가, hover 디자인
   * - [ ] 반응형 디자인
   * - [x] 할 일 없음, 로딩중 UI
   * - [ ] 더보기 버튼 클릭시 더 보여주기
   * - [ ] 새 할 일 버튼을 클릭 시, 할일 생성 페이지로 이동하고, 목표란은 해당 목표로 자동 입력
   */

  return (
    <ul
      className={`
        p-6 rounded-md bg-blue-50 
        flex flex-col items-center gap-4 hover:shadow-2xl
        `}
    >
      <div className="flex flex-col items-start gap-2 self-stretch">
        <div className="flex justify-between items-center self-stretch">
          <h3 className="text-lg font-bold text-basic">{title}</h3>
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
        </div>
        <div>프로그래스바</div>
      </div>
      <div className="flex gap-6 self-stretch">
        {results.map(({ data, isLoading }, index) => (
          <ul key={index} className="flex flex-col gap-3 grow-[1]">
            <p className="text-sm font-semibold text-basic">
              {index === 0 ? "To do" : "Done"}
            </p>
            {isLoading ? (
              <p className="text-sm font-normal text-slate-500 text-center">
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
              <p className="text-sm font-normal text-slate-500 text-center">
                {index === 0
                  ? "아직 해야할 일이 없어요"
                  : "아직 다 한 일이 없어요"}
              </p>
            )}
          </ul>
        ))}
      </div>
      <button
        className={`
          flex gap-[2px] items-center justify-center
          rounded-basic bg-white p-1 w-[120px] 
          text-sm font-semibold text-slate-700`}
      >
        <span>더보기</span>
        <Image
          className="rotate-90"
          src="/icons/arrow-right.svg"
          alt="더보기 버튼"
          width={24}
          height={24}
        />
      </button>
    </ul>
  )
}
