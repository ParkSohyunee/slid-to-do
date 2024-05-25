import type { Meta, StoryObj } from "@storybook/react"
import Label from "@/components/Label"

const meta = {
  title: "Label/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    htmlFor: { control: "text", description: "htmlFor 속성" },
    children: { control: "text", description: "Label의 title" },
  },
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    htmlFor: "label",
    children: "제목",
  },
}
