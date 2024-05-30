export type User = {
  id: number
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export type AuthenticatedUser = {
  user: User
  refreshToken: "string"
  accessToken: "string"
}
