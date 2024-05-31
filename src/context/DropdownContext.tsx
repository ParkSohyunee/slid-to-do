import { ReactNode, createContext, useContext, useState } from "react"

type DropdownContextType = {
  selectedList: string
  changeSelected: (list: string) => void
}

const DropdownContext = createContext<DropdownContextType | null>(null)

export const useDropdownContext = () => {
  const context = useContext(DropdownContext)
  if (!context) {
    throw new Error(
      "useDropdownContext는 DropdownProvider 안에서 사용해야 합니다.",
    )
  }
  return context
}

export const DropdownProvider = ({ children }: { children: ReactNode }) => {
  const [selectedList, setSelectedList] = useState("")

  const changeSelected = (list: string) => {
    setSelectedList(list)
  }

  return (
    <DropdownContext.Provider value={{ selectedList, changeSelected }}>
      {children}
    </DropdownContext.Provider>
  )
}
