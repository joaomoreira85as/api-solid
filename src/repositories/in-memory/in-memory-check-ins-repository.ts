import { CheckIn, CheckInData } from '@/dtos/checkin'
import { CheckInsRepository } from '../check-ins-repository'
import { randomUUID } from 'node:crypto'
export class InMemoryCheckInsRepository implements CheckInsRepository {
  public items: CheckInData[] = []

  async findById(id: string) {
    const checkin = this.items.find((item) => item.id === id)
    if (!checkin) {
      return null
    }
    return checkin
  }

  async create(data: CheckIn) {
    const checkin = {
      id: data.id ? data.id : randomUUID(),
      gym_id: data.gym_id,
      user_id: data.user_id,
      created_at: new Date(),
      validated_at: data.validated_at,
    } as CheckInData
    this.items.push(checkin)
    return checkin
  }
}
