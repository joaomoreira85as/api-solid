import { UsersRepository } from '@/repositories/users-repository'
import { ApiError } from './errors/ApiError'
import { UserData } from '@/dtos/user'

type GetUSerProfileUseCaseRequest = {
  userId: string
}

type GetUSerProfileUseCaseResponse = {
  user: UserData
}

export class GetUserProfileUseCase {
  constructor(private usersRepository: UsersRepository) {}
  async execute({
    userId,
  }: GetUSerProfileUseCaseRequest): Promise<GetUSerProfileUseCaseResponse> {
    const user = await this.usersRepository.findById(userId)
    if (!user) {
      throw new ApiError('User not found', 404)
    }

    return {
      user,
    }
  }
}
