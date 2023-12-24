import { User, UserData } from '@/dtos/user'

export interface UsersRepository {
  findByEmail(email: string): Promise<UserData | null>
  create(data: User): Promise<UserData>
}
