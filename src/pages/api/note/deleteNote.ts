import axiosInstance from "@/libs/axios/axiosInstance"

export default async function deleteNote(noteId: number) {
  await axiosInstance.delete(`/notes/${noteId}`)
}
