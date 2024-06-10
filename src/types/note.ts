import { GoalDetail } from "./goal"
import { Todo } from "./todos"

export type NoteFormData = {
  todoId: number
  title: string
  content: string
  linkUrl?: string
}

export type NoteDetail = {
  id: number
  title: string
  content: string
  linkUrl?: string
  createdAt: string
  updatedAt: string
  todo: Pick<Todo, "done" | "fileUrl" | "linkUrl" | "title" | "id">
  goal: Pick<GoalDetail, "id" | "title">
  userId: number
  teamId: string
}
