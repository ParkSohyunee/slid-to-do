import Image from "next/image"

/**
 * TODO
 * [ ] 목표 상세 조회 API 연동 (title, progress, todo, done)
 * [x] UI 구현
 * [ ] 목표 수정, 삭제 기능 구현
 * [ ] 수정, 삭제 팝업 메뉴 구현
 * [ ] 목표 수정시 사이드바에 반영
 * [ ] 목표 삭제의 경우 확인 모달 띄우기
 * [ ] 할 일 없음 UI, 로딩 UI
 * [ ] 기타 애니메이션 적용
 * [ ] 각 할 일 카드 무한스크롤 적용
 */
export default function GoalDetailPage() {
  return (
    <section className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">목표</h1>
      <div className="flex flex-col gap-6 h-full">
        <div className="bg-white px-6 py-4 border border-slate-100 rounded-sm">
          <div className="flex justify-between items-center pb-6">
            <div className="flex items-center gap-2">
              <span>이미지</span>
              <h3 className="text-lg font-semibold text-basic">
                자바스크립트로 웹 서비스 만들기
              </h3>
            </div>
            <Image
              src="/icons/meatballs-menu.svg"
              alt="목표 수정 및 삭제 버튼"
              width={24}
              height={24}
              className="cursor-pointer"
            />
          </div>
          <div>프로그래스바</div>
        </div>
        <div
          className="
          flex items-center justify-between
          bg-blue-100 px-6 py-4 border border-bule-100 rounded-sm
          "
        >
          <div className="flex items-center gap-2">
            <span>이미지</span>
            <h3 className="text-lg font-bold text-basic">노트 모아보기</h3>
          </div>
          <Image
            src="/icons/arrow-right.svg"
            alt="노트 모아보기 버튼"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </div>
        <div className="grid gap-6 grid-cols-2">
          <div
            className="
            px-6 py-4 rounded-sm bg-white border border-slate-100
            flex flex-col gap-4
            "
          >
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-basic">To do</h3>
              <button className="flex gap-1 items-center">
                <Image
                  src="/icons/plus-blue-small.svg"
                  alt="할 일 추가 버튼"
                  width={16}
                  height={16}
                />
                <span className="text-sm font-semibold text-blue-500">
                  할일 추가
                </span>
              </button>
            </div>
            <div>할일 목록</div>
          </div>
          <div
            className="
            px-6 py-4 rounded-sm bg-slate-200 border border-slate-100
            flex flex-col gap-4
            "
          >
            <h3 className="text-lg font-bold text-basic">To do</h3>
            <div>할일 목록</div>
          </div>
        </div>
      </div>
    </section>
  )
}