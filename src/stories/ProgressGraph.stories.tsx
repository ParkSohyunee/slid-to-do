import type { Meta, StoryObj } from "@storybook/react"
import ProgressGraph from "@/components/progress/ProgressGraph"

const meta = {
  title: "Progress/ProgressGraph",
  component: ProgressGraph,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div
        className="
        h-[250px]
        bg-blue-500 border border-slate-100 
        rounded-sm
        px-6 pt-4 pb-6
        max-tablet:p-4
        relative z-0"
      >
        <Story />
      </div>
    ),
  ],
  argTypes: {
    progress: { control: "number", description: "내 할일 진행률" },
  },
} satisfies Meta<typeof ProgressGraph>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    progress: 75,
  },
}
