import { NextFunction, Request, Response } from 'express'
import * as yup from 'yup'

type Schemas = {
  body?: yup.ObjectSchema
  params?: yup.ObjectSchema
  query?: yup.ObjectSchema
}

export function validateInputs(schemas: Schemas) {
  return async (request: Request, response: Response, next: NextFunction) => {
    for (const input of Object.keys(schemas)) {
      await (schemas[input as keyof Schemas] as yup.ObjectSchema).validate(
        request[input as keyof Schemas],
        { abortEarly: false }
      )
    }

    next()
  }
}
