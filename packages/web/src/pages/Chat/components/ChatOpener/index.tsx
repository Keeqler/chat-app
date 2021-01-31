import { useContext } from 'react'
import * as datefns from 'date-fns'

import { ChatContext } from '@/pages/Chat/contexts'
import { Message, User } from '@/types'

import { Avatar } from '../Avatar'
import { Username } from '../Username'
import * as s from './styles'

type Props = {
  user: User
  lastMessage?: Message
  onClick?: (user: User) => void
}

export const ChatOpener = ({ user, lastMessage, onClick }: Props) => {
  const chatContext = useContext(ChatContext)
  const [onlineStatuses] = chatContext.onlineStatusesState
  const [, setChatOpenUserId] = chatContext.chatOpenUserIdState
  const [, setChatOpenMobile] = chatContext.chatOpenMobileState

  let creationDate = ''

  if (lastMessage) {
    const creationDateObj = new Date(lastMessage.createdAt)
    creationDate = datefns.format(creationDateObj, 'dd/MM/yyyy')

    if (datefns.isThisWeek(creationDateObj)) creationDate = datefns.format(creationDateObj, 'EEEE')
    if (datefns.isYesterday(creationDateObj)) creationDate = 'Yesterday'
    if (datefns.isToday(creationDateObj)) creationDate = datefns.format(creationDateObj, 'KK:mm a')
  }

  function handleClick() {
    if (onClick) onClick(user)
    setChatOpenUserId(user.id)
    setChatOpenMobile(true)
  }

  return (
    <s.ChatOpener onClick={handleClick}>
      <s.Inner>
        <s.LeftSide>
          <Avatar image={user.avatar} online={onlineStatuses[user.id]} style={{ minWidth: 48 }} />

          <s.NameAndLastMessage>
            <Username style={{ marginBottom: 2 }}>{user.username}</Username>

            {!!lastMessage && (
              <s.LastMessage>
                {lastMessage.sender.id !== user.id && <strong>You: </strong>} {lastMessage.message}
              </s.LastMessage>
            )}
          </s.NameAndLastMessage>
        </s.LeftSide>

        {!!creationDate && <s.Time>{creationDate}</s.Time>}
      </s.Inner>

      <s.BottomBorder />
    </s.ChatOpener>
  )
}
