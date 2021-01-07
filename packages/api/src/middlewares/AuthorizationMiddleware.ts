import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import lodash from 'lodash'

import { HttpError } from '@/errors'
import { JwtPayload } from '@/types'

export const AuthorizationMiddleware = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const authorizationHeader = request.headers.authorization

  if (!authorizationHeader) {
    throw new HttpError(400, 'Authorization header is required')
  }

  const [, token] = authorizationHeader.split(' ')

  try {
    const decodedJwt = jwt.verify(token || 'a', process.env.JWT_SECRET, { ignoreExpiration: true })

    request.user = lodash.pick(decodedJwt, [
      'id',
      'username',
      'avatar',
      'createdAt',
      'updatedAt'
    ]) as JwtPayload

    next()
  } catch {
    throw new HttpError(401, 'Invalid JWT')
  }
}
