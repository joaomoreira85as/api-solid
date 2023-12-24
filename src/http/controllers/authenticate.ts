import { makeAuthenticateUseCase } from '@/use-cases/factories/make-authenticate-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })
  const body = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()
  const result = await authenticateUseCase.execute(body)
  return reply.status(200).send(result)
}
