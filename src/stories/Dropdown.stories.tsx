import type { Meta, StoryObj } from "@storybook/react"
import Dropdown from "@/components/Dropdown"
import { DropdownProvider } from "@/context/DropdownContext"
import { FormProvider, useForm } from "react-hook-form"

const meta = {
  title: "Dropdown/DropdownForTodos",
  component: Dropdown,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <DropdownProvider>
          <Story />
        </DropdownProvider>
      </FormProvider>
    ),
  ],
  argTypes: {
    list: { control: "object", description: "드롭다운 메뉴 리스트" },
    defaultList: { control: "text", description: "드롭다운 default 메뉴" },
  },
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    list: [
      {
        id: 1,
        title: "메뉴1",
        userId: 6,
        createdAt: "2024-05-27T06:51:51.900Z",
        updatedAt: "2024-05-27T06:51:51.900Z",
        teamId: "1-01",
      },
      {
        id: 2,
        title: "메뉴2",
        userId: 6,
        createdAt: "2024-05-27T06:51:51.900Z",
        updatedAt: "2024-05-27T06:51:51.900Z",
        teamId: "1-01",
      },
      {
        id: 3,
        title: "메뉴3",
        userId: 6,
        createdAt: "2024-05-27T06:51:51.900Z",
        updatedAt: "2024-05-27T06:51:51.900Z",
        teamId: "1-01",
      },
    ],
    defaultList: "메뉴를 선택해주세요",
  },
}
