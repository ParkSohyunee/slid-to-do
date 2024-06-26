import ProgressForTodosCard from "@/components/ProgressForTodosCard"
import RecentlyTodosCard from "@/components/RecentlyTodosCard"
import TodosAboutGoalContainer from "@/components/TodosAboutGoalContainer"

export default function DashboardPage() {
  return (
    <div className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900 max-sm:hidden">
        대시보드
      </h1>
      <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 grid-rows-cards h-full max-sm:pt-12">
        <RecentlyTodosCard />
        <ProgressForTodosCard />
        <div className="tablet:col-span-2">
          <TodosAboutGoalContainer />
        </div>
      </div>
    </div>
  )
}
