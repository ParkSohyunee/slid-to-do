import { GoalDetail } from "./goal"

export type SelectedOption = "file" | "link"

export type TodosFormVaules = {
  [key: string]: unknown
  title: string
  fileUrl?: string
  linkUrl?: string
  goalId?: number
  done?: string
}

export type SimpleTodo = {
  id: number
  title: string
  done: boolean
  goal: Pick<GoalDetail, "id" | "title">
}

export type Todo = {
  [key: string]: unknown
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

export type ProgressForTodos = {
  progress: number
}
