export type User = {
  id?: string
  name: string
  email: string
  password_hash: string
  created_at: Date
}

export type UserData = User & {
  id: string
}
