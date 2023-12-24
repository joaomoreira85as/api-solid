import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { hash } from 'bcryptjs'
import { ApiError } from './errors/ApiError'
import { GetUserProfileUseCase } from './get-user-profile'

let usersRepository: InMemoryUsersRepository
let sut: GetUserProfileUseCase
describe('Get User Profile Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new GetUserProfileUseCase(usersRepository)
  })
  it('should be able to get user profile', async () => {
    await usersRepository.create({
      id: '<ID>',
      name: '<NAME>',
      email: '<EMAIL>',
      password_hash: await hash('<PASSWORD>', 8),
    })

    const { user } = await sut.execute({ userId: '<ID>' })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able get user profile with wrond id', async () => {
    try {
      await sut.execute({ userId: 'non-existing-id' })
    } catch (error) {
      expect((error as ApiError).message).toEqual('User not found')
    }
  })
})
