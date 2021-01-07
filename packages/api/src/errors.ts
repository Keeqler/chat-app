import util from 'util'
import fs from 'fs'
import { ErrorRequestHandler } from 'express'
import { ValidationError } from 'yup'

export class HttpError extends Error {
  status: number

  constructor(status: number, message: string) {
    super()

    this.name = 'HttpError'
    this.status = status
    this.message = message
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const errorHandler: ErrorRequestHandler = async (error, request, response, next) => {
  if (request.file) {
    await util.promisify(fs.unlink)(request.file.path)
  }

  if (error instanceof HttpError) {
    return response.status(error.status).send({ error: error.message })
  }

  if (error instanceof ValidationError) {
    const errors: Record<string, string[]> = {}

    error.inner.forEach(valError => {
      errors[valError.path] = valError.errors
    })

    return response.status(400).send(errors)
  }

  console.log(error)

  response.sendStatus(500)
}
