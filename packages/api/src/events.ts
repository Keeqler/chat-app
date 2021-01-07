import { Socket } from 'socket.io'
import { getRepository } from 'typeorm'
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

type ConnectedSocket = {
  socketId: string
  userId: number
}

export const messagePayloadSchema = yup.object().shape({
  to: yup.number().required().min(0),
  message: yup.string().required().max(1000)
})

let connectedSockets: ConnectedSocket[] = []

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

  connectedSockets.push({ socketId: socket.id, userId: user.id })

  console.log('connected:', socket.id)

  socket.on('disconnect', () => {
    connectedSockets = connectedSockets.filter(cs => cs.socketId !== socket.id)

    console.log('disconnected:', socket.id)
  })

  socket.on('message', async (payload: MessagePayload) => {
    try {
      await messagePayloadSchema.validate(payload)
    } catch {
      console.log('invalid')
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

    const receiverSocketId = connectedSockets.filter(cs => cs.userId === receiver.id)[0]?.socketId

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('message', message)
    }
  })
})
