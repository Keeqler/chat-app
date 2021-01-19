import { useContext } from 'react'

import { ChatHistoryContext, ChatOpenUserIdContext } from '@/pages/Chat/contexts'
import { User } from '@/types'

import { Avatar } from '../Avatar'
import { Username } from '../Username'
import * as s from './styles'

type Props = {
  user: User
  message?: string
  time?: string
  online?: boolean
  onClick?: () => void
}

export const ChatOpener = ({ user, message, time, online, onClick }: Props) => {
  const [chatHistory, setChatHistory] = useContext(ChatHistoryContext)
  const [chatOpenUserId, setChatOpenUserId] = useContext(ChatOpenUserIdContext)

  function handleClick() {
    if (onClick) {
      onClick()
    }

    if (!chatHistory[user.id]) {
      setChatHistory(state => {
        state[user.id] = { user, lastMessage: null, messages: [] }
        return state
      })
    }

    if (chatOpenUserId && !chatHistory[chatOpenUserId].lastMessage) {
      setChatHistory(state => {
        delete state[chatOpenUserId]
        return state
      })
    }

    setChatOpenUserId(user.id)
  }

  return (
    <s.HistoryChat onClick={handleClick}>
      <s.Inner>
        <s.LeftSide>
          <Avatar image={user.avatar} online={online} style={{ minWidth: 48 }} />

          <s.NameAndLastMessage>
            <Username style={{ marginBottom: 2 }}>{user.username}</Username>
            <s.LastMessage>{message}</s.LastMessage>
          </s.NameAndLastMessage>
        </s.LeftSide>

        <s.Time>{time}</s.Time>
      </s.Inner>

      <s.BottomBorder />
    </s.HistoryChat>
  )
}
