import axiosInstance from "@/libs/axios/axiosInstance"

export default async function uploadFiles(data: { file: File }) {
  const response = await axiosInstance.post("/files", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
  return response.data
}
