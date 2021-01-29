import { useEffect, useContext } from 'react'
import { Socket } from 'socket.io-client'
import * as datefns from 'date-fns'

import { Message, User, UsersState, MessagesState } from '@/types'

import { UsersContext, MessagesContext, OnlineStatusesContext } from '../../contexts'
import { ChatOpener } from '../ChatOpener'
import { UnderlinedTitle } from '../UnderlinedTitle'
import * as s from './styles'

type Props = {
  socket: Socket | null
}

type ChatHistoryPayload = { user: User; lastMessage: Message | null }[]

export const ChatHistory = ({ socket }: Props) => {
  const [users, setUsers] = useContext(UsersContext)
  const [messages, setMessages] = useContext(MessagesContext)
  const [onlineStatuses] = useContext(OnlineStatusesContext)

  useEffect(() => {
    if (!socket) return

    socket.on('chatHistory', (chatHistory: ChatHistoryPayload) => {
      const _users: UsersState = {}
      const _messages: MessagesState = {}

      chatHistory.forEach(item => {
        _users[item.user.id] = item.user
        _messages[item.user.id] = !!item.lastMessage ? [item.lastMessage] : []
      })

      setUsers(_users)
      setMessages(_messages)
    })
  }, [])

  const chatHistory: { user: User; lastMessage: Message }[] = Object.entries(messages)
    .map(([userId, _messages]) => ({
      user: users[parseInt(userId)],
      lastMessage: _messages[0]
    }))
    .filter(chat => !!chat.lastMessage)
    .sort((a, b) => (a.lastMessage.createdAt < b.lastMessage.createdAt ? 1 : -1))

  return (
    <>
      {!!chatHistory.length && (
        <UnderlinedTitle style={{ marginLeft: 10 }}>Chat history</UnderlinedTitle>
      )}

      <s.ChatOpeners>
        {chatHistory.map(chat => {
          if (!chat.lastMessage) return

          const creationDate = new Date(chat.lastMessage.createdAt)
          let time = datefns.format(creationDate, 'dd/MM/yyyy')

          if (datefns.isThisWeek(creationDate)) time = datefns.format(creationDate, 'EEEE')
          if (datefns.isYesterday(creationDate)) time = 'Yesterday'
          if (datefns.isToday(creationDate)) time = datefns.format(creationDate, 'HH:mm')

          return (
            <ChatOpener
              key={chat.user.id}
              user={chat.user}
              message={chat.lastMessage.message}
              online={onlineStatuses[chat.user.id]}
              time={time}
            />
          )
        })}
      </s.ChatOpeners>
    </>
  )
}
