import { useRef } from "react"
import { useDropdownContext } from "@/context/DropdownContext"
import { useDetectClose } from "@/hooks/useDetectClose"

export default function Dropdown({ lists }: any) {
  const dropdownRef = useRef(null)
  const { selectedList, changeSelected } = useDropdownContext()
  const { isOpen, toggleHandler } = useDetectClose({ ref: dropdownRef })

  return (
    <div ref={dropdownRef}>
      <input
        onClick={toggleHandler}
        defaultValue={selectedList}
        readOnly
        className={`
        w-full px-6 py-3 
        rounded-sm bg-slate-50 
        text-base font-normal text-basic placeholder:text-slate-400
        border focus:outline-none
        border-slate-50 hover:border-blue-300
        cursor-pointer
        `}
        type="text"
        autoComplete="off"
        placeholder="목표를 선택해주세요"
      />
      {isOpen && (
        <ul>
          {lists?.map((list: any, index: number) => (
            <li key={index} onClick={() => changeSelected(list.title)}>
              {list.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
