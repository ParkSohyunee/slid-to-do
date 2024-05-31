import { ReactNode, createContext, useContext, useState } from "react"

type ModalContextType = {
  isOpen: boolean
  openModal: () => unknown
  closeModal: () => unknown
}

const ModalContext = createContext<ModalContextType>({} as ModalContextType)

// 모달 기본 로직을 관리하는 커스텀 훅
const useDefaultModalLoggic = <T extends unknown>() => {
  const [isOpen, setIsOpen] = useState(false)
  const [modalData, setModalData] = useState<T | undefined>()

  const openModal = (props?: T) => {
    setIsOpen(true)
    setModalData(props)
  }

  const closeModal = (props?: T) => {
    setIsOpen(false)
    setModalData(props)
  }

  return {
    isOpen,
    modalData,
    openModal,
    closeModal,
  }
}

// 모달을 사용하기 위한 커스텀 훅
export const useModal = () => {
  const context = useContext(ModalContext)
  if (!context) {
    throw new Error("useModal은 ModalContextProvider 안에서 사용해야 합니다.")
  }
  return context
}

export const ModalContextProvider = ({ children }: { children: ReactNode }) => {
  const { isOpen, openModal, closeModal } = useDefaultModalLoggic()
  const modalContextValue: ModalContextType = {
    isOpen,
    openModal,
    closeModal,
  }

  return (
    <ModalContext.Provider value={modalContextValue}>
      {children}
    </ModalContext.Provider>
  )
}
