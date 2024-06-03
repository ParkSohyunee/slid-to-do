import { useCallback, useState } from "react"

const useToggle = (initialState = false) => {
  const [isOpen, setIsOpen] = useState(initialState)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback((prev: boolean) => setIsOpen(!prev), [])

  return {
    open,
    close,
    toggle,
    isOpen,
  }
}

export default useToggle
