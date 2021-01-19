import { Request, Response } from 'express'
import { getRepository, Like } from 'typeorm'
import util from 'util'
import path from 'path'
import sharp from 'sharp'
import bcrypt from 'bcrypt'
import fs from 'fs'

import { User } from '@/entities/User'
import { HttpError } from '@/errors'
import { generateJwt } from '@/helpers'

type StoreReqBody = { username: string; password: string }
type StoreResBody = { jwt: string }
type IndexReqQuery = { query: string }
type IndexResBody = Omit<User, 'accessToken'>[]

class Controller {
  async store(request: Request<any, any, StoreReqBody>, response: Response<StoreResBody>) {
    const userRepository = getRepository(User)
    const { username, password } = request.body
    const userExists = await userRepository.findOne({ username })

    if (userExists) {
      throw new HttpError(400, 'USERNAME_TAKEN')
    }

    let avatarFilename

    if (request.file) {
      avatarFilename = request.file.filename + '.jpg'

      await sharp(request.file.path)
        .resize(100, 100)
        .jpeg({ quality: 80 })
        .toFile(path.join(__dirname, '..', '..', 'uploads', avatarFilename))

      await util.promisify(fs.unlink)(request.file.path)
    }

    const user = userRepository.create({
      username,
      password: await bcrypt.hash(password, 2),
      avatar: avatarFilename
    })

    await userRepository.save(user)

    response.status(201).send({ jwt: generateJwt(user) })
  }
}

export const UserController = new Controller()
