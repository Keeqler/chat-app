import { Socket } from 'socket.io'
import { getRepository, Like } from 'typeorm'
import * as yup from 'yup'
import jwt from 'jsonwebtoken'

import { io } from './app'
import { Message } from './entities/Message'
import { User } from './entities/User'
import { JwtPayload } from './types'

type MessagePayload = { to: number; message: string }
type MessageHistoryPayload = { userId: number }
type UserSearchPayload = { username: string; excludedUsernames: string[] }

type ConnectedSockets = {
  [userId: number]: string
}

const messagePayloadSchema = yup.object().shape({
  to: yup.number().required().min(1),
  message: yup.string().required().max(1000)
})

const messageHistoryPayloadSchema = yup.object().shape({
  userId: yup.number().required()
})

const userSearchPayloadSchema = yup.object().shape({
  username: yup.string().required(),
  excludedUsernames: yup.array().of(yup.string())
})

const connectedSockets: ConnectedSockets = {}

io.on('connection', async (socket: Socket) => {
  const token = (socket.handshake.auth as { jwt: string }).jwt

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

  socket.broadcast.emit('onlineStatus', { [user.id]: true })

  const messages = await messageRepository
    .createQueryBuilder('messages')
    .leftJoinAndSelect('messages.sender', 'sender')
    .leftJoinAndSelect('messages.receiver', 'receiver')
    .where('messages.senderId = :id OR messages.receiverId = :id', { id: user.id })
    .orderBy('messages.id', 'DESC')
    .getMany()

  // TODO: probably, there's a way to make this more efficient

  const chatHistory: Record<number, { user: User; lastMessage: Message }> = {}
  const onlineStatus: { [userId: number]: boolean } = {}

  for (const message of messages) {
    const chatUser = message.receiver.id !== user.id ? message.receiver : message.sender

    if (!(chatUser.id in chatHistory)) {
      chatHistory[chatUser.id] = { user: chatUser, lastMessage: message }
      onlineStatus[chatUser.id] = chatUser.id in connectedSockets
    }
  }

  socket.emit('chatHistory', chatHistory)
  socket.emit('onlineStatus', onlineStatus)

  socket.on('disconnect', () => {
    delete connectedSockets[user.id]

    socket.broadcast.emit('onlineStatus', { [user.id]: false })
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

  socket.on('messageHistory', async (payload: MessageHistoryPayload) => {
    try {
      await messageHistoryPayloadSchema.validate(payload)
    } catch {
      return
    }

    const messages = await messageRepository.find({
      where: [
        { sender: user.id, receiver: payload.userId },
        { sender: payload.userId, receiver: user.id }
      ],
      order: { createdAt: 'DESC' },
      join: {
        alias: 'message',
        leftJoinAndSelect: { sender: 'message.sender', receiver: 'message.receiver' }
      }
    })

    socket.emit('messageHistory', { userId: payload.userId, messages })
  })

  socket.on('userSearch', async (payload: UserSearchPayload) => {
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

  socket.on('onlineStatus', async (userId: number) => {
    socket.emit('onlineStatus', { [userId]: userId in connectedSockets })
  })
})
