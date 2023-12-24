import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'
import { ApiError } from './errors/ApiError'

let usersRepository: InMemoryUsersRepository
let sut: AuthenticateUseCase
describe('Authenticate Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new AuthenticateUseCase(usersRepository)
  })
  it('should be able to authenticate', async () => {
    await usersRepository.create({
      name: '<NAME>',
      email: '<EMAIL>',
      password_hash: await hash('<PASSWORD>', 8),
    })

    const { user } = await sut.execute({
      email: '<EMAIL>',
      password: '<PASSWORD>',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await usersRepository.create({
      name: '<NAME>',
      email: '<EMAIL>',
      password_hash: await hash('<PASSWORD>', 8),
    })

    try {
      await sut.execute({
        email: '<EMAIL2>',
        password: '<PASSWORD>',
      })
    } catch (error) {
      expect((error as ApiError).message).toEqual('Invalid credentials')
    }
  })

  it('should not be able to authenticate with wrong password', async () => {
    await usersRepository.create({
      name: '<NAME>',
      email: '<EMAIL>',
      password_hash: await hash('<PASSWORD>', 8),
    })

    try {
      await sut.execute({
        email: '<EMAIL>',
        password: '<PASSWORD2>',
      })
    } catch (error) {
      expect((error as ApiError).message).toEqual('Invalid credentials')
    }
  })
})
