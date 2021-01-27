import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import { useAuth } from '@/store/auth'
import { Message, TChatHistory } from '@/types'

import { Avatar } from './components/Avatar'
import { ChatHistory } from './components/ChatHistory'
import { UserSearch } from './components/UserSearch'
import { Chat } from './components/Chat'
import { Username } from './components/Username'
import { ChatHistoryContext, ChatOpenUserIdContext } from './contexts'
import * as s from './styles'

export const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [chatHistory, setChatHistory] = useState<TChatHistory>({})
  const [chatOpenUserId, setChatOpenUserId] = useState<number | null>(null)
  const authState = useAuth(state => state)

  console.log(chatHistory)

  useEffect(() => {
    const _socket = io(process.env.REACT_APP_API_URL, {
      auth: { jwt: authState.jwt },
      reconnectionDelayMax: 10000
    })

    setSocket(_socket)

    return () => {
      if (!_socket) return

      _socket.close()
    }
  }, [])

  useEffect(() => {
    if (!socket) return

    socket.on('message', (payload: Message) => {
      setChatHistory(state => {
        const chat = state[payload.sender.id] || {}

        return {
          ...state,
          [payload.sender.id]: {
            ...state[payload.sender.id],
            messages: [payload, ...(chat.messages || [])],
            lastMessage: payload
          }
        }
      })
    })

    socket.on('onlineStatus', (payload: { [userId: number]: boolean }) => {
      setChatHistory(state => {
        for (const userId of Object.keys(payload)) {
          state[userId].online = payload[(userId as unknown) as number]
        }

        return { ...state }
      })
    })
  }, [socket])

  if (!socket) return <></>

  return (
    <s.Chat>
      <ChatHistoryContext.Provider value={[chatHistory, setChatHistory]}>
        <ChatOpenUserIdContext.Provider value={[chatOpenUserId, setChatOpenUserId]}>
          <s.LeftSideBar>
            <s.Profile>
              <s.ProfileMainContent>
                <Avatar image={authState.user?.avatar} online />

                <s.Welcome>
                  <s.WelcomeText>Welcome back,</s.WelcomeText>
                  <Username>{authState.user?.username}</Username>
                </s.Welcome>
              </s.ProfileMainContent>

              <s.SignOutButton onClick={authState.signOut}>Sign out</s.SignOutButton>
            </s.Profile>

            <s.Chats>
              <UserSearch socket={socket} />
              <ChatHistory socket={socket} />
            </s.Chats>
          </s.LeftSideBar>

          <Chat socket={socket} />
        </ChatOpenUserIdContext.Provider>
      </ChatHistoryContext.Provider>
    </s.Chat>
  )
}
