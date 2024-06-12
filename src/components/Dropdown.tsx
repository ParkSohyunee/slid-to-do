import Image from "next/image"
import { MouseEvent, useRef } from "react"
import { useFormContext } from "react-hook-form"

import { useDropdownContext } from "@/context/DropdownContext"
import { useDetectClose } from "@/hooks/useDetectClose"
import { useQuery } from "@tanstack/react-query"
import { QUERY_KEYS } from "@/libs/constants/queryKeys"
import getGoalList from "@/pages/api/goal/getGoalList"

const DEFAUL_LIST = "목표를 선택해주세요"

export default function Dropdown() {
  const dropdownRef = useRef(null)
  const { selectedList, changeSelected } = useDropdownContext()
  const { isOpen, toggleHandler } = useDetectClose({ ref: dropdownRef })
  const { setValue } = useFormContext()

  const { data } = useQuery({
    queryKey: [QUERY_KEYS.getGoalList],
    queryFn: getGoalList,
  })

  const changeSelectedList = (e: MouseEvent<HTMLUListElement>) => {
    const { textContent, id } = e.target as HTMLLIElement
    changeSelected(textContent as string)

    if (id) {
      setValue("goalId", Number(id))
    } else {
      setValue("goalId", null)
    }
    toggleHandler()
  }

  return (
    <div ref={dropdownRef}>
      <div onClick={toggleHandler} className="relative">
        <input
          defaultValue={selectedList}
          readOnly
          className={`
          w-full px-6 py-3 truncate
          rounded-sm bg-slate-50 
          text-base font-normal text-basic placeholder:text-slate-400
          border focus:outline-none
          border-slate-50 hover:border-blue-300
          cursor-pointer
        `}
          type="text"
          autoComplete="off"
          placeholder={DEFAUL_LIST}
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
          className="rounded-sm bg-gray-50 relative top-[5px] overflow-auto max-h-[132px]"
        >
          {selectedList && (
            <li
              className={`
              text-base font-normal text-slate-400 
              rounded-sm py-[10px] px-4 cursor-default
              `}
            >
              {DEFAUL_LIST}
            </li>
          )}
          {data?.goals.map((list) => (
            <li
              key={list.id}
              id={list.id + ""}
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
