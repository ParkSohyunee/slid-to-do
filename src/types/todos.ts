export type SelectedOption = "file" | "link"

export type TodosFormVaules = {
  [key: string]: string | number | undefined
  title: string
  fileUrl?: string
  linkUrl?: string
  goalId?: number
}
