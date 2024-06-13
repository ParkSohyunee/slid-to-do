import axiosInstance from "@/libs/axios/axiosInstance"
import { NoteFormData } from "@/types/note"

type UpdateNoteProps = {
  noteId: number
  data: Omit<NoteFormData, "todoId">
}

export default async function updateNote({ noteId, data }: UpdateNoteProps) {
  const response = await axiosInstance.patch(`/notes/${noteId}`, data)
  return response.data
}
