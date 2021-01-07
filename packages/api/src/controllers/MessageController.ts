import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { Message } from '@/entities/Message'

export type IndexReqQuery = { with: string }
export type IndexResBody = Message[]

class Controller {
  async index(request: Request<any, any, any, IndexReqQuery>, response: Response<IndexResBody>) {
    const messageRepository = getRepository(Message)

    const messages = await messageRepository.find({
      where: [
        { sender: request.user?.id, receiver: request.query.with },
        { sender: request.query.with, receiver: request.user?.id }
      ]
    })

    response.send(messages)
  }
}

export const MessageController = new Controller()
