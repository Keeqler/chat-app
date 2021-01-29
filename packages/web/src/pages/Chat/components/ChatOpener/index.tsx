import { useContext } from 'react'

import { ChatOpenUserIdContext } from '@/pages/Chat/contexts'
import { User } from '@/types'

import { Avatar } from '../Avatar'
import { Username } from '../Username'
import * as s from './styles'

type Props = {
  user: User
  message?: string
  time?: string
  online?: boolean
  onClick?: (user: User) => void
}

export const ChatOpener = ({ user, message, time, online, onClick }: Props) => {
  const [, setChatOpenUserId] = useContext(ChatOpenUserIdContext)

  function handleClick() {
    if (onClick) onClick(user)
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
