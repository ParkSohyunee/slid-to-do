import CreateTodos from "@/components/CreateTodos"
import ProgressForTodosCard from "@/components/ProgressForTodosCard"
import RecentlyTodosCard from "@/components/RecentlyTodosCard"
import TodosAboutGoalContainer from "@/components/TodosAboutGoalContainer"
import ModalContainer from "@/components/modal/ModalContainer"
import { useModal } from "@/context/ModalContext"

export default function DashboardPage() {
  const { isOpen } = useModal()
  return (
    <>
      {isOpen && (
        <ModalContainer>
          <CreateTodos />
        </ModalContainer>
      )}
      <div className="h-full max-w-1200 flex flex-col">
        <h1 className="mb-4 text-lg font-semibold text-slate-900">대시보드</h1>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-6 grid-rows-cards h-full">
          <RecentlyTodosCard />
          <ProgressForTodosCard />
          <div className="tablet:col-span-2">
            <TodosAboutGoalContainer />
          </div>
        </div>
      </div>
    </>
  )
}
