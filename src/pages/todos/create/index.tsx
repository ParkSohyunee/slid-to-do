import CreateTodos from "@/components/CreateTodos"
import ModalContainer from "@/components/modal/ModalContainer"

import { useModal } from "@/context/ModalContext"

export default function CreateTodosPage() {
  const { openModal } = useModal()

  return (
    <>
      <button onClick={openModal}>모달 오픈</button>
      <ModalContainer>
        <CreateTodos />
      </ModalContainer>
    </>
  )
}
