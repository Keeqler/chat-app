import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'

import { useAuth } from '@/store/auth'
import { TChatHistory } from '@/types'

import { Avatar } from './components/Avatar'
import { ChatHistory } from './components/ChatHistory'
import { UserSearch } from './components/UserSearch'
import { Chat } from './components/Chat'
import { Username } from './components/Username'
import { ChatHistoryContext, ChatOpenUserIdContext } from './contexts'
import * as s from './styles'

export const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const chatHistoryState = useState<TChatHistory>({})
  const chatOpenUserIdState = useState<number | null>(null)
  const authState = useAuth(state => state)

  useEffect(() => {
    const _socket = io(process.env.REACT_APP_API_URL, {
      auth: { jwt: authState.jwt },
      reconnectionDelayMax: 10000
    })

    setSocket(_socket)

    return () => {
      if (_socket === null) return

      _socket.close()
    }
  }, [])

  if (!socket) return <></>

  return (
    <s.Chat>
      <ChatHistoryContext.Provider value={chatHistoryState}>
        <ChatOpenUserIdContext.Provider value={chatOpenUserIdState}>
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

          <Chat />
        </ChatOpenUserIdContext.Provider>
      </ChatHistoryContext.Provider>
    </s.Chat>
  )
}
