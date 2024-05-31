import type { Meta, StoryObj } from "@storybook/react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import SidebarForStory from "./SidebarForStory"

const queryClient = new QueryClient()

const meta = {
  title: "Sidebar/LeftSidebar",
  component: SidebarForStory,
  parameters: {
    layout: "fullscreen",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
      </QueryClientProvider>
    ),
  ],
  argTypes: {},
} satisfies Meta<typeof SidebarForStory>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
