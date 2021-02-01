import { useState, useEffect } from 'react'
import { io, Socket } from 'socket.io-client'
import { CSSTransition } from 'react-transition-group'

import { useAuth } from '@/store/auth'
import { Message, User } from '@/types'

import { Avatar } from './components/Avatar'
import { ChatHistory } from './components/ChatHistory'
import { UserSearch } from './components/UserSearch'
import { Chat } from './components/Chat'
import { Username } from './components/Username'
import { ChatContext, TChatContext } from './contexts'
import * as s from './styles'

export const ChatPage = () => {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [users, setUsers] = useState<{ [userId: number]: User }>({})
  const [messages, setMessages] = useState<{ [userId: number]: Message[] }>({})
  const [onlineStatuses, setOnlineStatuses] = useState<{ [userId: number]: boolean }>({})
  const [chatOpenUserId, setChatOpenUserId] = useState<number>(0)
  const [chatOpenMobile, setChatOpenMobile] = useState<boolean>(false)
  const authState = useAuth(state => state)

  const contextProviderValue: TChatContext = {
    usersState: [users, setUsers],
    messagesState: [messages, setMessages],
    onlineStatusesState: [onlineStatuses, setOnlineStatuses],
    chatOpenUserIdState: [chatOpenUserId, setChatOpenUserId],
    chatOpenMobileState: [chatOpenMobile, setChatOpenMobile]
  }

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

    socket.on('message', (message: Message) => {
      const senderId = message.sender.id

      if (!users[senderId]) {
        setUsers(state => ({ ...state, [senderId]: message.sender }))

        socket.emit('onlineStatus', senderId)
      }

      if (!messages[senderId]) {
        setMessages(state => ({ ...state, [senderId]: [message] }))
        return
      }

      setMessages(state => ({ ...state, [senderId]: [message, ...state[senderId]] }))
    })

    socket.on('onlineStatus', (onlineStatuses: { [userId: number]: boolean }) => {
      setOnlineStatuses(state => ({ ...state, ...onlineStatuses }))
    })

    return () => {
      socket.off('message')
      socket.off('onlineStatus')
    }
  }, [socket, messages])

  if (!socket) return <></>

  return (
    <s.Chat>
      <ChatContext.Provider value={contextProviderValue}>
        <CSSTransition
          in={
            (!chatOpenMobile && window.screen.availWidth <= 940) || window.screen.availWidth > 940
          }
          classNames="leftSideBar"
          timeout={400}
          unmountOnExit
        >
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

              {!Object.keys(messages).length && (
                <s.NoConversations>
                  <strong>You had no conversations yet</strong>
                  Use the search box above and find someone to chat!
                </s.NoConversations>
              )}
            </s.Chats>
          </s.LeftSideBar>
        </CSSTransition>

        <CSSTransition
          in={(chatOpenMobile && window.screen.availWidth <= 940) || window.screen.availWidth > 940}
          classNames="chat"
          timeout={400}
          unmountOnExit
        >
          <Chat socket={socket} />
        </CSSTransition>
      </ChatContext.Provider>
    </s.Chat>
  )
}
