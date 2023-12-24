import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { ApiError } from './errors/ApiError'

let usersRepository: InMemoryUsersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository()
    sut = new RegisterUseCase(usersRepository)
  })
  it('should be able to register a new user', async () => {
    const { user } = await sut.execute({
      name: '<NAME>',
      email: '<EMAIL>',
      password: '<PASSWORD>',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const { user } = await sut.execute({
      name: '<NAME>',
      email: '<EMAIL>',
      password: '<PASSWORD>',
    })

    const isPasswordCorrectlyHashed = await compare(
      '<PASSWORD>',
      user.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to retister new user with same email', async () => {
    const email = 'emailfake@fake.com'

    await sut.execute({
      name: '<NAME>',
      email,
      password: '<PASSWORD>',
    })

    await expect(() =>
      sut.execute({
        name: '<NAME2>',
        email,
        password: '<PASSWORD2>',
      }),
    ).rejects.toBeInstanceOf(ApiError)
  })
})
