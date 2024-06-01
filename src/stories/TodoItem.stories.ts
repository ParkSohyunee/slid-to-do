import type { Meta, StoryObj } from "@storybook/react"
import TodoItem from "@/components/item/TodoItem"

const meta = {
  title: "Item/TodoItem",
  component: TodoItem,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    todo: {
      control: "object",
      description: "todo, done 아이템",
    },
  },
} satisfies Meta<typeof TodoItem>

export default meta
type Story = StoryObj<typeof meta>

export const Todo: Story = {
  args: {
    todo: {
      noteId: 1,
      done: false,
      linkUrl: "",
      fileUrl: "",
      title: "storybook 공부하기",
      id: 0,
      goal: {
        title: "프로젝트",
        id: 0,
      },
      userId: 0,
      teamId: "",
      updatedAt: "",
      createdAt: "",
    },
  },
}

export const Done: Story = {
  args: {
    todo: {
      noteId: 1,
      done: true,
      linkUrl: "",
      fileUrl: "",
      title: "storybook 공부하기",
      id: 0,
      goal: {
        title: "프로젝트",
        id: 0,
      },
      userId: 0,
      teamId: "",
      updatedAt: "",
      createdAt: "",
    },
  },
}
