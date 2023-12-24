import { User, UserData } from '@/dtos/user'

export interface UsersRepository {
  findById(id: string): Promise<UserData | null>
  findByEmail(email: string): Promise<UserData | null>
  create(data: User): Promise<UserData>
}
