import type { Meta, StoryObj } from "@storybook/react"
import { DropdownProvider } from "@/context/DropdownContext"
import { FormProvider, useForm } from "react-hook-form"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import CreateTodos from "@/components/CreateTodos"
import { fn } from "@storybook/test"

const queryClient = new QueryClient()

const meta = {
  title: "Modal/CreateTodos",
  component: CreateTodos,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <FormProvider {...useForm()}>
          <DropdownProvider>
            <Story />
          </DropdownProvider>
        </FormProvider>
      </QueryClientProvider>
    ),
  ],
  argTypes: {
    edit: { control: "boolean", description: "할 일 수정 여부" },
    todo: { control: "object", description: "각각의 할 일 " },
    onClose: {
      action: "clicked",
      description: "모달 닫기 이벤트",
    },
  },
  // 👇 Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked
  args: { onClose: fn() },
} satisfies Meta<typeof CreateTodos>

export default meta
type Story = StoryObj<typeof meta>

export const CreateTodo: Story = {
  args: {},
}

export const EditTodo: Story = {
  args: {
    edit: true,
  },
}
