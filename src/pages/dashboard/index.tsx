import ProgressForTodosCard from "@/components/ProgressForTodosCard"
import RecentlyTodosCard from "@/components/RecentlyTodosCard"
import TodosAboutGoalContainer from "@/components/TodosAboutGoalContainer"

export default function DashboardPage() {
  return (
    <div className="h-full max-w-1200">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">대시보드</h1>
      <div className="grid grid-cols-2 gap-6 grid-rows-cards h-full">
        <RecentlyTodosCard />
        <ProgressForTodosCard />
        <div className="col-span-2">
          <TodosAboutGoalContainer />
        </div>
      </div>
    </div>
  )
}
