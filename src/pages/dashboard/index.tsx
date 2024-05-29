import ProgressForTodos from "@/components/ProgressForTodos"
import RecentlyTodosCard from "@/components/RecentlyTodosCard"

export default function DashboardPage() {
  return (
    <div className="h-full max-w-1200">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">대시보드</h1>
      <div className="grid grid-cols-2 gap-6">
        <RecentlyTodosCard />
        <ProgressForTodos />
        <div className="bg-blue-400 col-span-2">목표 별 할 일</div>
      </div>
    </div>
  )
}
