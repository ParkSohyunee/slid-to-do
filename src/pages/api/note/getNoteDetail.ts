import axiosInstance from "@/libs/axios/axiosInstance"
import { NoteDetail } from "@/types/note"

export default async function getNoteDetail(noteId: number) {
  const response = await axiosInstance.get<NoteDetail>(`/notes/${noteId}`)

  return response.data
}
