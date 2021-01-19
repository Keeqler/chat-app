import { useContext } from 'react'
import * as yup from 'yup'

// import { Socket } from 'socket.io-client'

import { Form } from '@/components/Form'
import { FormInput } from '@/components/FormInput'

import { ChatHistoryContext, ChatOpenUserIdContext } from '../../contexts'
import { Avatar } from '../Avatar'
import { HorizontalSeparator } from '../HorizontalSeparator'
import { Username } from '../Username'
import * as s from './styles'

// type Props = { socket: Socket }

type Inputs = { message: string }

const schema = yup.object().shape({ message: yup.string().min(1) })

export const Chat = () => {
  const [chatHistory] = useContext(ChatHistoryContext)
  const [chatOpenUserId] = useContext(ChatOpenUserIdContext)

  if (!chatOpenUserId) return <></>

  const recipient = chatHistory[chatOpenUserId].user

  function handleSubmit(inputs: Inputs) {
    console.log(inputs)
  }

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

      <s.Messages />

      <s.MessageInputContainer>
        <Form onSubmit={handleSubmit} schema={schema}>
          <FormInput
            name="message"
            placeholder="Send a message..."
            errorDisplayDisabled
            isTextArea
            style={{ marginBottom: 0 }}
          />
        </Form>
      </s.MessageInputContainer>
    </s.Chat>
  )
}
