import { prisma } from '@/lib/prisma'
import { CheckInsRepository } from '../check-ins-repository'
import { CheckIn, CheckInData } from '@/dtos/checkin'
import { mapPrismaCheckInToCheckInData } from './factory/check-ins-factory'

export class PrismaCheckinsRepository implements CheckInsRepository {
  async findById(id: string): Promise<CheckInData | null> {
    const checkins = await prisma.checkIn.findUnique({ where: { id } })
    if (!checkins) {
      return null
    }
    return mapPrismaCheckInToCheckInData(checkins)
  }

  async create(data: CheckIn): Promise<CheckInData> {
    const checkins = await prisma.checkIn.create({
      data: {
        user_id: data.user_id,
        gym_id: data.gym_id,
      },
    })
    return mapPrismaCheckInToCheckInData(checkins)
  }
}
