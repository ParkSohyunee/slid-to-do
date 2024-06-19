/** 사이드바 title에 들어갈 페이지 pathname */
const matchedPageName: Record<string, string> = {
  "/dashboard": "대시보드",
  "/todos-list": "모든 할 일",
  "/goal/[goalId]": "목표",
  "/goal/[goalId]/notes": "노트 모아보기",
  "/todos-list/[todoId]/write-note": "노트 작성",
  "/goal/[goalId]/notes/[noteId]/edit": "노트 수정",
}

export default matchedPageName
