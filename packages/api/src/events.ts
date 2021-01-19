import { Socket } from 'socket.io'
import { getRepository, Like } from 'typeorm'
import * as yup from 'yup'
import jwt from 'jsonwebtoken'

import { io } from './app'
import { Message } from './entities/Message'
import { User } from './entities/User'
import { JwtPayload } from './types'

export type MessagePayload = {
  to: number
  message: string
}

type ConnectedSockets = {
  [userId: number]: string
}

const messagePayloadSchema = yup.object().shape({
  to: yup.number().required().min(0),
  message: yup.string().required().max(1000)
})

const userSearchPayloadSchema = yup.object().shape({
  username: yup.string().required(),
  excludedUsernames: yup.array().of(yup.string())
})

const connectedSockets: ConnectedSockets = {}

io.on('connection', async (socket: Socket) => {
  const token = (socket.handshake.auth as any).jwt

  if (!token) {
    socket.disconnect()
    return
  }

  let jwtPayload: JwtPayload

  try {
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload
  } catch {
    socket.disconnect()
    return
  }

  const userRepository = getRepository(User)
  const messageRepository = getRepository(Message)

  const user = await userRepository.findOne(jwtPayload.id)

  if (!user) {
    socket.disconnect()
    return
  }

  connectedSockets[user.id] = socket.id

  console.log('connected:', socket.id)

  const messages = await messageRepository
    .createQueryBuilder('messages')
    .leftJoinAndSelect('messages.sender', 'sender')
    .leftJoinAndSelect('messages.receiver', 'receiver')
    .where('messages.senderId = :id OR messages.receiverId = :id', { id: user.id })
    .orderBy('messages.id', 'DESC')
    .getMany()

  // probably, there's a way to make this more efficient

  const chatHistory: Record<number, { user: User; lastMessage: Message }> = {}

  for (const message of messages) {
    const chatWith = message.receiver.id !== user.id ? message.receiver : message.sender

    if (chatWith.id in chatHistory) {
      continue
    }

    chatHistory[chatWith.id] = { user: chatWith, lastMessage: message }
  }

  socket.emit('chatHistory', chatHistory)

  socket.on('disconnect', () => {
    delete connectedSockets[user.id]

    console.log('disconnected:', socket.id)
  })

  socket.on('message', async (payload: MessagePayload) => {
    try {
      await messagePayloadSchema.validate(payload)
    } catch {
      return
    }

    if (payload.to === user.id) {
      return
    }

    const receiver = await userRepository.findOne(payload.to)

    if (!receiver) {
      return
    }

    const message = messageRepository.create({
      sender: user,
      receiver,
      message: payload.message
    })

    await messageRepository.save(message)

    const receiverSocketId = connectedSockets[receiver.id]

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message', message)
    }
  })

  socket.on('userSearch', async (payload: { username: string; excludedUsernames: string[] }) => {
    try {
      await userSearchPayloadSchema.validate(payload)
    } catch {
      return
    }

    const users = await userRepository
      .createQueryBuilder('user')
      .where({ username: Like(`%${payload.username}%`) })
      .andWhere('user.username NOT IN (:...excludedUsernames)', {
        excludedUsernames: [...payload.excludedUsernames, user.username]
      })
      .getMany()

    socket.emit('userSearch', users)
  })
})
