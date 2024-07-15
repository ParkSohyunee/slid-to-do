import type { Meta, StoryObj } from "@storybook/react"
import Image from "next/image"
import { fn } from "@storybook/test"
import PopupMenu from "@/components/popup/PopupMenu"

const meta = {
  title: "Popup/PopupMenu",
  component: PopupMenu,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="rounded-sm border border-slate-100 p-4">
        <div className="w-[250px] relative flex justify-between items-center">
          <div className="bg-blue-100 rounded-[8px] w-[28px] h-[28px] px-[6px] py-[7px]">
            <Image
              src="/icons/note-list.svg"
              alt="팝업 컨테이너"
              width={18}
              height={18}
            />
          </div>
          <button className="bg-slate-50 rounded-full w-6 h-6 p-[5px]">
            <Image
              src="/icons/meatballs-menu.svg"
              alt="수정 및 삭제 버튼"
              width={14}
              height={14}
            />
          </button>
          <Story />
        </div>
      </div>
    ),
  ],
  argTypes: {
    onClickEdit: {
      action: "clicked",
      description: "수정하기 옵션 이벤트 핸들러",
    },
    onClickDelete: {
      action: "clicked",
      description: "삭제하기 옵션 이벤트 핸들러",
    },
  },
  args: { onClickEdit: fn(), onClickDelete: fn() },
} satisfies Meta<typeof PopupMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
