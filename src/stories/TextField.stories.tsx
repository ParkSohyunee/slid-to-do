import type { Meta, StoryObj } from "@storybook/react"
import TextField from "@/components/TextField"
import { FormProvider, useForm } from "react-hook-form"

const meta = {
  title: "TextField/DefaultTextField",
  component: TextField,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <FormProvider {...useForm()}>
        <Story />
      </FormProvider>
    ),
  ],
  argTypes: {
    field: { control: "text", description: "input register name" },
    placeholder: { control: "text", description: "placeholder" },
    validationRules: {
      control: "object",
      description: "input 유효성 검사 Rules",
    },
  },
} satisfies Meta<typeof TextField>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    field: "email",
    placeholder: "이메일을 입력해 주세요",
    validationRules: {
      required: "이메일은 입력해 주세요.",
      pattern: {
        value: /^[a-z]+@[a-z]+.[a-z]{2,3}$/,
        message: "이메일 형식으로 작성해 주세요.",
      },
    },
  },
}
