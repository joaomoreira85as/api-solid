import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users-repository'
import { RegisterUseCase } from '../register'

export function makeRegisterUseCase() {
  const prismaUsersRepository = new PrismaUsersRepository()
  return new RegisterUseCase(prismaUsersRepository)
}
