import { GoalDetail } from "./goal"
import { Todo } from "./todos"

export type NoteFormData = {
  todoId: number
  title: string
  content: string
  linkUrl?: string
}

type CardAboutNoteList = {
  id: number
  title: string
  createdAt: string
  updatedAt: string
  todo: Pick<Todo, "done" | "title" | "id">
  goal: Pick<GoalDetail, "id" | "title">
  userId: number
  teamId: string
}

export type NoteList = {
  nextCursor: number
  totalCount: number
  notes: CardAboutNoteList[]
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
