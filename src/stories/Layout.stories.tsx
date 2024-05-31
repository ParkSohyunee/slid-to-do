import type { Meta, StoryObj } from "@storybook/react"
import Layout from "@/components/Layout"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import RecentlyTodosCard from "@/components/RecentlyTodosCard"
import ProgressForTodosCard from "@/components/ProgressForTodosCard"
import TodosAboutGoalContainer from "@/components/TodosAboutGoalContainer"

const queryClient = new QueryClient()

const meta = {
  title: "Layout/DefaultLayout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    children: { description: "레이아웃 내부 페이지, 파란색 영역은 사이드바" },
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
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
    ),
  },
}
