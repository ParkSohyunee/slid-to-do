import Image from "next/image"

export default function TodosAboutGoalCard() {
  return (
    <div
      className={`
        bg-white border border-slate-100 
        rounded-sm h-[250px] 
        flex flex-col px-6 pt-4 pb-6
        max-tablet:p-4
        relative`}
    >
      <div className="flex items-center justify-between pb-4">
        <div className="flex justify-center items-center gap-2">
          <Image
            src="/icons/todo-goals.svg"
            alt="최근 등록한 할 일"
            width={40}
            height={40}
          />
          <span className="text-base tablet:text-lg font-semibold text-basic">
            최근 등록한 할 일
          </span>
        </div>
      </div>
    </div>
  )
}
