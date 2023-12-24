import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from './errors/user-already-exists'

describe('Register Use Case', () => {
  it('should be able to register a new user', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
      name: '<NAME>',
      email: '<EMAIL>',
      password: '<PASSWORD>',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('should hash user password upon registration', async () => {
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)

    const { user } = await registerUseCase.execute({
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
    const usersRepository = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUseCase(usersRepository)
    const email = 'emailfake@fake.com'

    await registerUseCase.execute({
      name: '<NAME>',
      email,
      password: '<PASSWORD>',
    })

    await expect(() =>
      registerUseCase.execute({
        name: '<NAME2>',
        email,
        password: '<PASSWORD2>',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })
})
