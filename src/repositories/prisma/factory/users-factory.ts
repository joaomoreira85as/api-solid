import { UserData } from '@/dtos/user'
import { User } from '@prisma/client'

export const mapPrismaUserToUserData = (user: User): UserData => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    password_hash: user.password_hash,
    created_at: user.created_at,
  }
}
