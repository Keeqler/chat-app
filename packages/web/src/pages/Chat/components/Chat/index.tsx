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

import { ChatContext } from '../../contexts'
import { Avatar } from '../Avatar'
import { Username } from '../Username'
import * as s from './styles'

type Props = { socket: Socket }

const schema = yup.object().shape({ message: yup.string().min(1) })

export const Chat = ({ socket }: Props) => {
  const user = useAuth(state => state.user)
  const chatContext = useContext(ChatContext)
  const [users] = chatContext.usersState
  const [messages, setMessages] = chatContext.messagesState
  const [onlineStatuses] = chatContext.onlineStatusesState
  const [chatOpenUserId] = chatContext.chatOpenUserIdState
  const [, setChatOpenMobile] = chatContext.chatOpenMobileState
  const [formMethods, setFormMethods] = useState<UseFormMethods | null>(null)
  const submitButtonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    if (chatOpenUserId && messages[chatOpenUserId] && messages[chatOpenUserId].length < 3) {
      socket.emit('messageHistory', { userId: chatOpenUserId })
      socket.emit('onlineStatus', chatOpenUserId)
    }

    socket.on('messageHistory', (messageHistory: { userId: number; messages: Message[] }) => {
      setMessages(state => ({ ...state, [messageHistory.userId]: messageHistory.messages }))
    })

    return () => {
      socket.off('messageHistory')
    }
  }, [chatOpenUserId])

  if (!chatOpenUserId || !user) return <></>

  const chatOpenUser = users[chatOpenUserId]
  const chatOpenUserIsOnline = onlineStatuses[chatOpenUserId]
  const messageHistory = messages[chatOpenUserId] || []

  function handleSubmit(inputs: { message: string }) {
    socket.emit('message', { to: chatOpenUserId, message: inputs.message })

    const message = {
      id: Math.random(), // generating a random ID as we don't need the actual one
      message: inputs.message,
      receiver: chatOpenUser,
      sender: user as User,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    setMessages(state => ({
      ...state,
      [chatOpenUserId]: [message, ...(state[chatOpenUserId] || [])]
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
      <s.GoBackButton onClick={() => setChatOpenMobile(false)} />

      <s.Recipient>
        <Avatar image={chatOpenUser.avatar} style={{ marginRight: 10 }} />

        <s.RecipientRight>
          <Username>{chatOpenUser.username}</Username>

          <s.RecipientStatus status={chatOpenUserIsOnline ? 'online' : 'offline'}>
            <s.RecipientStatusCircle status={chatOpenUserIsOnline ? 'online' : 'offline'} />{' '}
            {chatOpenUserIsOnline ? 'Online' : 'Offline'}
          </s.RecipientStatus>
        </s.RecipientRight>
      </s.Recipient>

      <s.MessagesFadeWrapper>
        <s.MessagesFade />
      </s.MessagesFadeWrapper>

      <s.Messages>
        {messageHistory.map(message => (
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
