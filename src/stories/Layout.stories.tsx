import type { Meta, StoryObj } from "@storybook/react"
import Layout from "@/components/Layout"

const meta = {
  title: "Layout/DefaultLayout",
  component: Layout,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  argTypes: {
    children: { description: "레이아웃 내부 페이지, 파란색 영역은 사이드바" },
  },
} satisfies Meta<typeof Layout>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: (
      <div className="bg-white h-full max-w-1200">
        <h1>대시보드</h1>
        <div>내용</div>
      </div>
    ),
  },
}
