import { createContext, Dispatch, SetStateAction } from 'react'

import { ChatOpenUserIdState, MessagesState, OnlineStatusesState, UsersState } from '@/types'

export type TChatContext = {
  usersState: [UsersState, Dispatch<SetStateAction<UsersState>>]
  messagesState: [MessagesState, Dispatch<SetStateAction<MessagesState>>]
  onlineStatusesState: [OnlineStatusesState, Dispatch<SetStateAction<OnlineStatusesState>>]
  chatOpenUserIdState: [ChatOpenUserIdState, Dispatch<SetStateAction<ChatOpenUserIdState>>]
  chatOpenMobileState: [boolean, Dispatch<SetStateAction<boolean>>]
}

export const ChatContext = createContext<TChatContext>({} as TChatContext)
