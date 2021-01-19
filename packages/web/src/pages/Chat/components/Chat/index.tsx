import { useContext } from 'react'

// import { Socket } from 'socket.io-client'

import { ChatHistoryContext, ChatOpenUserIdContext } from '../../contexts'
import { Avatar } from '../Avatar'
import { HorizontalSeparator } from '../HorizontalSeparator'
import { Username } from '../Username'
import * as s from './styles'

// type Props = { socket: Socket }

export const Chat = () => {
  const [chatHistory] = useContext(ChatHistoryContext)
  const [chatOpenUserId] = useContext(ChatOpenUserIdContext)

  if (!chatOpenUserId) return <></>

  const recipient = chatHistory[chatOpenUserId].user

  return (
    <s.Chat>
      <s.Recipient>
        <Avatar image={recipient.avatar} style={{ marginRight: 10 }} />

        <s.RecipientRight>
          <Username>{recipient.username}</Username>

          <s.RecipientStatus status="online">
            <s.RecipientStatusCircle status="online" /> Online
          </s.RecipientStatus>
        </s.RecipientRight>

        <HorizontalSeparator style={{ marginTop: 20 }} />
      </s.Recipient>
    </s.Chat>
  )
}
