import { Request, Response } from 'express'
import { getRepository } from 'typeorm'
import bcrypt from 'bcrypt'

import { User } from '@/entities/User'
import { HttpError } from '@/errors'
import { generateJwt } from '@/helpers'

type StoreReqBody = { username: string; password: string }
type StoreResBody = { jwt: string }

class Controller {
  async store(request: Request<any, any, StoreReqBody>, response: Response<StoreResBody>) {
    const userRepository = getRepository(User)

    const user = await userRepository.findOne(
      { username: request.body.username },
      { select: ['id', 'username', 'password', 'avatar', 'createdAt', 'updatedAt'] }
    )

    if (!user) {
      throw new HttpError(400, 'INVALID_CREDENTIALS')
    }

    if (!(await bcrypt.compare(request.body.password, user.password as string))) {
      throw new HttpError(400, 'INVALID_CREDENTIALS')
    }

    response.status(201).send({ jwt: generateJwt(user) })
  }
}

export const AuthController = new Controller()
