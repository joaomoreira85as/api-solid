export class ApiError extends Error {
  code: number
  statusCode: number
  message: string
  data: unknown
  constructor(message: string, code = 400) {
    super(message)
    this.message = message
    this.code = code
    this.statusCode = code
  }

  withData(data: unknown): ApiError {
    this.data = data
    return this
  }
}
