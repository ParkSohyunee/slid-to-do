/**
 * TODO
 * [ ] 목표 상세 조회 API 연동 (title, progress, todo, done)
 * [ ] UI 구현
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
    <div className="h-full max-w-1200 flex flex-col">
      <h1 className="mb-4 text-lg font-semibold text-slate-900">목표</h1>
      <div className="flex flex-col gap-6 h-full">
        <div>목표 제목</div>
        <div>노트 모아보기</div>
        <div>할일 들</div>
      </div>
    </div>
  )
}
