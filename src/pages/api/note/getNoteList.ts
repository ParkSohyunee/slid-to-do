import axiosInstance from "@/libs/axios/axiosInstance"
import { NoteList } from "@/types/note"

type NoteListProps = {
  [key: string]: unknown
  goalId: number
  cursor?: number
  size?: number
}

export default async function getNoteList(data?: NoteListProps) {
  const queryParams = new URLSearchParams()

  for (const params in data) {
    if (data[params] !== null) {
      queryParams.append(params, (data[params] as number).toString())
    }
  }

  const response = await axiosInstance.get<NoteList>(`/notes?${queryParams}`)
  return response.data
}
