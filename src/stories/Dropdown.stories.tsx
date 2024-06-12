import type { Meta, StoryObj } from "@storybook/react"
import Dropdown from "@/components/Dropdown"
import { DropdownProvider } from "@/context/DropdownContext"
import { FormProvider, useForm } from "react-hook-form"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const meta = {
  title: "Dropdown/DropdownForTodos",
  component: Dropdown,
  parameters: {
    layout: "centered",
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
  argTypes: {},
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
