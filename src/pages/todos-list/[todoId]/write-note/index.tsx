import { useRouter } from "next/router"

export default function WriteNoteForTodoPage() {
  const router = useRouter()
  const { title, done, goal } = router.query

  console.log(title, done, goal)

  return (
    <section className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">노트 작성</h1>
      <div className="flex flex-col gap-6 h-full">
        <div>목표와 할 일</div>
        <div>에디터</div>
      </div>
    </section>
  )
}
