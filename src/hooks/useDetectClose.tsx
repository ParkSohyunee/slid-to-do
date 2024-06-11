import { RefObject, useEffect, useState } from "react"

export function useDetectClose({ ref }: { ref: RefObject<HTMLElement> }) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleHandler = () => {
    setIsOpen((prev) => !prev)
  }

  // ref 외부 공간 클릭 감지
  useEffect(() => {
    const onClick = (e: Event) => {
      if (ref.current !== null && !ref.current.contains(e.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      window.addEventListener("click", onClick)
    } else {
      window.removeEventListener("click", onClick)
    }

    return () => {
      window.removeEventListener("click", onClick)
    }
  }, [isOpen, ref])

  return { isOpen, toggleHandler, ref }
}
