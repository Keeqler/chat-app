import { KeyboardEvent, useContext, useEffect, useRef, useState } from 'react'
import { UseFormMethods } from 'react-hook-form'
import { Socket } from 'socket.io-client'
import * as yup from 'yup'
import * as datefns from 'date-fns'

import { Form } from '@/components/Form'
import { FormInput } from '@/components/FormInput'
import { FormMethodsGetter } from '@/components/FormMethodsGetter'
import { StandardButton } from '@/components/Button'
import { useAuth } from '@/store/auth'
import { Message, User } from '@/types'

import { ChatHistoryContext, ChatOpenUserIdContext } from '../../contexts'
import { Avatar } from '../Avatar'
import { Username } from '../Username'
import * as s from './styles'

type Props = { socket: Socket }

const schema = yup.object().shape({ message: yup.string().min(1) })

export const Chat = ({ socket }: Props) => {
  const user = useAuth(state => state.user)
  const [chatHistory, setChatHistory] = useContext(ChatHistoryContext)
  const [chatOpenUserId] = useContext(ChatOpenUserIdContext)
  const [formMethods, setFormMethods] = useState<UseFormMethods | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (chatOpenUserId) {
      socket.emit('messageHistory', { userId: chatOpenUserId })
    }

    socket.on('messageHistory', (payload: { userId: number; messages: Message[] }) => {
      if (!payload.messages.length) return

      setChatHistory(state => ({
        ...state,
        [payload.userId]: {
          ...state[payload.userId],
          user: state[payload.userId].user,
          lastMessage: payload.messages[0],
          messages: payload.messages
        }
      }))
    })

    return () => {
      socket.off('messageHistory')
    }
  }, [chatOpenUserId])

  if (!chatOpenUserId || !user) return <></>

  const chatOpenUser = chatHistory[chatOpenUserId].user
  const messages = chatHistory[chatOpenUserId].messages

  function handleSubmit(inputs: { message: string }) {
    socket.emit('message', { to: chatOpenUserId, message: inputs.message })

    const message = {
      message: inputs.message,
      receiver: chatOpenUser,
      sender: user as User,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setChatHistory(state => ({
      ...state,
      [chatOpenUserId as number]: {
        ...state[chatOpenUserId as number],
        lastMessage: message,
        messages: [message, ...state[chatOpenUserId as number].messages]
      }
    }))

    formMethods?.reset()
  }

  function handleInputKeypress(event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    if (!event.shiftKey && event.key === 'Enter') {
      event.preventDefault()
      submitButtonRef.current?.click()
    }
  }

  return (
    <s.Chat>
      <s.Recipient>
        <Avatar image={chatOpenUser.avatar} style={{ marginRight: 10 }} />

        <s.RecipientRight>
          <Username>{chatOpenUser.username}</Username>

          <s.RecipientStatus status="online">
            <s.RecipientStatusCircle status="online" /> Online
          </s.RecipientStatus>
        </s.RecipientRight>
      </s.Recipient>

      <s.MessagesFadeWrapper>
        <s.MessagesFade />
      </s.MessagesFadeWrapper>

      <s.Messages>
        {!!messages &&
          messages.map(message => (
            <s.Message key={Math.random()} incoming={message.sender.id === chatOpenUserId}>
              {message.message}
              <span>{datefns.formatRelative(new Date(message.createdAt), new Date())}</span>
            </s.Message>
          ))}
      </s.Messages>

      <s.FormContainer>
        <Form onSubmit={handleSubmit} schema={schema} disableLoading>
          <FormMethodsGetter setFormMethods={setFormMethods} />
          <s.FormInner>
            <FormInput
              name="message"
              placeholder="Send a message..."
              icon="assets/message-balloon-gray.svg"
              errorDisplayDisabled
              isTextArea
              onKeyPress={handleInputKeypress}
              style={{ marginBottom: 0, marginRight: 10 }}
            />

            <StandardButton ref={submitButtonRef} style={{ width: 40, height: 40, marginTop: 0 }}>
              <img src="assets/send.svg" />
            </StandardButton>
          </s.FormInner>
        </Form>
      </s.FormContainer>
    </s.Chat>
  )
}
