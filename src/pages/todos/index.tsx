import Image from "next/image"

export default function TodosPage() {
  return (
    <div className="h-full max-w-[792px] flex flex-col">
      <div className="flex justify-between items-center self-stretch mb-4">
        <h1 className="text-lg font-semibold text-slate-900">모든 할 일 (0)</h1>
        <button className="flex gap-1 items-center">
          <Image
            src="/icons/plus-blue-small.svg"
            alt="할 일 추가 버튼"
            width={16}
            height={16}
          />
          <span className="text-sm font-semibold text-blue-500">할일 추가</span>
        </button>
      </div>
      <div className="rounded-sm border border-slate-100 bg-white p-6 grow">
        카드
      </div>
    </div>
  )
}
