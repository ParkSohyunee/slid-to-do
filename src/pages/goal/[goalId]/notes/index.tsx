import Image from "next/image"

export default function NoteListAboutGoalPage() {
  return (
    <section className="h-full max-w-1200 flex flex-col gap-4">
      <h1 className="text-lg font-semibold text-slate-900">노트 모아보기</h1>
      <div className="flex gap-2 items-center bg-white rounded-sm border border-slate-100 py-[14px] px-6">
        <Image
          className="w-6 h-6 rounded-[8px] bg-slate-800 p-[4.8px]"
          src="/icons/flag-white.svg"
          alt="목표"
          width={24}
          height={24}
        />
        <h3 className="text-sm font-semibold text-basic">
          자바스크립트로 웹 서비스 만들기
        </h3>
      </div>
      <div className="bg-white p-6 rounded-sm border border-slate-100 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <div className="bg-blue-100 rounded-[8px] w-[28px] h-[28px] px-[6px] py-[7px]">
            <Image
              src="/icons/note-list.svg"
              alt="노트 리스트"
              width={18}
              height={18}
            />
          </div>
          <div className="bg-slate-50 rounded-full w-6 h-6 p-[5px] cursor-pointer">
            <Image
              src="/icons/meatballs-menu.svg"
              alt="할 일 수정 및 삭제 버튼"
              width={14}
              height={14}
            />
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <p className="text-lg font-medium text-basic">
            자바스크립트를 배우기 전 알아두어야 할 것
          </p>
          <div className="h-[1px] bg-slate-200"></div>
          <div className="flex gap-2 items-center">
            <span className="text-xs font-medium text-slate-700 rounded-[4px] bg-slate-100 px-[3px] py-[2px]">
              To do
            </span>
            <span className="text-xs font-normal text-slate-700">
              자바스크립트 기초 챕터1 듣기
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
