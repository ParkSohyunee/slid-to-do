import Image from "next/image"
import { MouseEvent, useRef } from "react"
import { useDropdownContext } from "@/context/DropdownContext"
import { useDetectClose } from "@/hooks/useDetectClose"
import { GoalDetail } from "@/types/goal"

type DropdownProps = {
  list: GoalDetail[]
  defaultList: string
}

export default function Dropdown({ list, defaultList }: DropdownProps) {
  const dropdownRef = useRef(null)
  const { selectedList, changeSelected } = useDropdownContext()
  const { isOpen, toggleHandler } = useDetectClose({ ref: dropdownRef })

  const changeSelectedList = (e: MouseEvent<HTMLUListElement>) => {
    const target = (e.target as HTMLLIElement).id
    changeSelected(target)
    toggleHandler()
  }

  return (
    <div ref={dropdownRef}>
      <div onClick={toggleHandler} className="relative">
        <input
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
          placeholder={defaultList}
        />
        <Image
          className="absolute top-3 right-[20px] cursor-pointer"
          src="/icons/arrow-down.svg"
          alt="드롭다운 메뉴열기"
          width={24}
          height={24}
        />
      </div>
      {isOpen && (
        <ul
          onClick={changeSelectedList}
          className="rounded-sm bg-gray-50 relative top-[5px]"
        >
          {selectedList && (
            <li
              className={`
              text-base font-normal text-slate-400 
              rounded-sm py-[10px] px-4 cursor-default
              `}
            >
              {defaultList}
            </li>
          )}
          {list?.map((list) => (
            <li
              key={list.id}
              id={list.title}
              className={`
              text-base font-normal text-basic 
              rounded-sm py-[10px] px-4
              hover:bg-gray-200 cursor-pointer
              ${selectedList === list.title ? "bg-blue-50" : "bg-gray-50"}
              `}
            >
              {list.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
