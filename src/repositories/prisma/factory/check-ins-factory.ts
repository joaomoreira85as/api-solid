import { CheckInData } from '@/dtos/checkin'
import { CheckIn } from '@prisma/client'

export const mapPrismaCheckInToCheckInData = (
  checkIn: CheckIn,
): CheckInData => {
  return {
    id: checkIn.id,
    user_id: checkIn.user_id,
    gym_id: checkIn.gym_id,
    validated_at: checkIn.validated_at || null,
    created_at: checkIn.created_at,
  }
}
