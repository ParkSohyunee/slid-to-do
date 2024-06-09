import type { Meta, StoryObj } from "@storybook/react"
import TextField from "@/components/TextField"
import { FormProvider, useForm } from "react-hook-form"
import Image from "next/image"

const meta = {
  title: "TextField/DefaultTextField",
  component: TextField,
  parameters: {
    layout: "padded",
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
    textInputType: { control: "boolean", description: "input type" },
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

export const PasswordInput: Story = {
  args: {
    field: "password",
    placeholder: "비밀번호를 입력해 주세요",
    textInputType: false,
    validationRules: {
      required: "비밀번호를 입력해 주세요.",
    },
    children: (
      <Image
        className="absolute top-1/2 right-6 transform -translate-y-1/2 cursor-pointer"
        src={`/icons/visibility-off.svg`}
        alt="비밀번호 보기"
        width={24}
        height={24}
      />
    ),
  },
}
