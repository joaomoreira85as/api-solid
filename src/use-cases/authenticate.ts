import { UsersRepository } from '@/repositories/users-repository'
import { compare } from 'bcryptjs'
import { ApiError } from './errors/ApiError'
import { UserData } from '@/dtos/user'

type AuthenticateUseCaseRequest = {
  email: string
  password: string
}

type AuthenticateUseCaseResponse = {
  user: UserData
}

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUseCaseResponse> {
    const user = await this.usersRepository.findByEmail(email)
    if (!user) {
      throw new ApiError('Invalid credentials', 401)
    }
    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new ApiError('Invalid credentials', 401)
    }

    return {
      user,
    }
  }
}
