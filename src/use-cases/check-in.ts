import { CheckInsRepository } from '@/repositories/check-ins-repository'

type CheckInUseCaseRequest = {
  userId: string
  gymId: string
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({ userId, gymId }: CheckInUseCaseRequest) {
    const checkIn = await this.checkInsRepository.create({
      user_id: userId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
