import { GoalDetail } from "./goal"

export type SelectedOption = "file" | "link"

export type TodosFormVaules = {
  [key: string]: string | number | undefined
  title: string
  fileUrl?: string
  linkUrl?: string
  goalId?: number
}

export type Todo = {
  noteId: number
  done: boolean
  linkUrl: string
  fileUrl: string
  title: string
  id: number
  goal: Pick<GoalDetail, "id" | "title">
  userId: number
  teamId: string
  updatedAt: string
  createdAt: string
}

export type AllTodos = {
  totalCount: number
  nextCursor: number
  todos: Todo[]
}
