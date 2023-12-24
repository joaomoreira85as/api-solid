import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from '../users-repository'
import { UserData } from '@/dtos/user'
import { mapPrismaUserToUserData } from './factory/users-factory'

export class PrismaUsersRepository implements UsersRepository {
  async findById(id: string): Promise<UserData | null> {
    const user = await prisma.user.findUnique({ where: { id } })
    if (!user) {
      return null
    }
    return mapPrismaUserToUserData(user)
  }

  async findByEmail(email: string): Promise<UserData | null> {
    const user = await prisma.user.findUnique({ where: { email } })
    if (!user) {
      return null
    }
    return mapPrismaUserToUserData(user)
  }

  async create(data: Prisma.UserCreateInput): Promise<UserData> {
    const user = await prisma.user.create({
      data,
    })
    return mapPrismaUserToUserData(user)
  }
}
