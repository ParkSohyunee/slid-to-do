// TODO API 조회해서 보여주기

import { DropdownProvider } from "@/context/DropdownContext"
import Dropdown from "./Dropdown"

export default function GoalDropdownForTodos() {
  const GOAL_LIST = [
    {
      updatedAt: "2024-05-27T06:51:51.900Z",
      createdAt: "2024-05-27T06:51:51.900Z",
      title: "목표1",
      id: 1,
      userId: 6,
      teamId: "1-01",
    },
    {
      updatedAt: "2024-05-27T06:51:51.900Z",
      createdAt: "2024-05-27T06:51:51.900Z",
      title: "목표2",
      id: 2,
      userId: 6,
      teamId: "1-01",
    },
    {
      updatedAt: "2024-05-27T06:51:51.900Z",
      createdAt: "2024-05-27T06:51:51.900Z",
      title: "목표3",
      id: 3,
      userId: 6,
      teamId: "1-01",
    },
    {
      updatedAt: "2024-05-27T06:51:51.900Z",
      createdAt: "2024-05-27T06:51:51.900Z",
      title: "목표4",
      id: 4,
      userId: 6,
      teamId: "1-01",
    },
  ]

  return (
    <DropdownProvider>
      <Dropdown lists={GOAL_LIST} />
    </DropdownProvider>
  )
}
