import type { Meta, StoryObj } from "@storybook/react"
import { fn } from "@storybook/test"
import CheckBoxButton from "@/components/buttons/CheckBoxButton"

const meta = {
  title: "Buttons/CheckBoxButton",
  component: CheckBoxButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    option: { control: "select", description: "file 또는 link" },
    selectedOption: {
      control: "select",
      description: "선택된 옵션으로 file 또는 link",
    },
    handleToggleSelect: { action: "clicked", description: "버튼 클릭 이벤트" },
  },
  args: { handleToggleSelect: fn() },
} satisfies Meta<typeof CheckBoxButton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    option: "file",
    selectedOption: "file",
  },
}
