export type GoalList = {
  nextCursor: number
  totalCount: number
  goals: GoalDetail[]
}

export type GoalDetail = {
  updatedAt: Date
  createdAt: Date
  title: string
  id: number
  userId: number
  teamId: string
}
