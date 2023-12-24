import { CheckIn, CheckInData } from '@/dtos/checkin'

export interface CheckInsRepository {
  findById(id: string): Promise<CheckInData | null>
  create(data: CheckIn): Promise<CheckInData>
}
