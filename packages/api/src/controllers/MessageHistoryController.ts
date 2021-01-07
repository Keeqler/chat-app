import { Request, Response } from 'express'
import { getRepository } from 'typeorm'

import { Message } from '@/entities/Message'
import { User } from '@/entities/User'

type IndexResBodyUser = Omit<User, 'accessToken' | 'receivedMessages' | 'sentMessages'>
type IndexResBody = (Message & {
  sender: IndexResBodyUser
  receiver: IndexResBodyUser
})[]

class Controller {
  async index(request: Request, response: Response<IndexResBody>) {
    const messageRepository = getRepository(Message)

    const messages = await messageRepository
      .createQueryBuilder('messages')
      .leftJoinAndSelect('messages.sender', 'sender')
      .leftJoinAndSelect('messages.receiver', 'receiver')
      .where('messages.senderId = :id OR messages.receiverId = :id', { id: request.user?.id })
      .orderBy('messages.id', 'DESC')
      .getMany()

    const filtered: Record<string, Message> = {}

    for (const message of messages) {
      if (`${message.sender.id}|${message.receiver.id}` in filtered) {
        continue
      }

      filtered[`${message.sender.id}|${message.receiver.id}`] = message
    }

    response.send(Object.values(filtered))
  }
}

export const MessageHistoryController = new Controller()
