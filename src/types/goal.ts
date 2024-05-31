export type GoalList = {
  nextCursor: number
  totalCount: number
  goals: GoalDetail[]
}

export type GoalDetail = {
  updatedAt: string
  createdAt: string
  title: string
  id: number
  userId: number
  teamId: string
}
