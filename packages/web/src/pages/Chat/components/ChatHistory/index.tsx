import { useEffect, useContext } from 'react'
import { Socket } from 'socket.io-client'
import * as datefns from 'date-fns'

import { TChatHistory } from '@/types'

import { ChatHistoryContext } from '../../contexts'
import { ChatOpener } from '../ChatOpener'
import { UnderlinedTitle } from '../UnderlinedTitle'
import * as s from './styles'

type Props = {
  socket: Socket | null
}

export const ChatHistory = ({ socket }: Props) => {
  const [chatHistory, setChatHistory] = useContext(ChatHistoryContext)
  const chatHistoryArray = Object.values(chatHistory)

  useEffect(() => {
    if (!socket) return

    socket.on('chatHistory', (payload: Omit<TChatHistory, 'messages'>) => {
      const chatHistory: TChatHistory = {}

      Object.values(payload).forEach(chat => {
        chatHistory[chat.user.id] = chat
      })

      setChatHistory(chatHistory)
    })
  }, [])

  return (
    <>
      {!!chatHistoryArray.length && (
        <UnderlinedTitle style={{ marginLeft: 10 }}>Chat history</UnderlinedTitle>
      )}

      <s.ChatOpeners>
        {chatHistoryArray.map(chat => {
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
              time={time}
              online
            />
          )
        })}
      </s.ChatOpeners>
    </>
  )
}
