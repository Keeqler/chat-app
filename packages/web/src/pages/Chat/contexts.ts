import { createContext, Dispatch, SetStateAction } from 'react'

import { ChatOpenUserIdState, MessagesState, OnlineStatusesState, UsersState } from '@/types'

type TUsersContext = [UsersState, Dispatch<SetStateAction<UsersState>>]
type TMessagesContext = [MessagesState, Dispatch<SetStateAction<MessagesState>>]
type TOnlineStatusesContext = [OnlineStatusesState, Dispatch<SetStateAction<OnlineStatusesState>>]
type TChatOpenUserIdContext = [ChatOpenUserIdState, Dispatch<SetStateAction<ChatOpenUserIdState>>]

export const UsersContext = createContext<TUsersContext>({} as TUsersContext)
export const MessagesContext = createContext<TMessagesContext>({} as TMessagesContext)
export const OnlineStatusesContext = createContext<TOnlineStatusesContext>(
  {} as TOnlineStatusesContext
)
export const ChatOpenUserIdContext = createContext<TChatOpenUserIdContext>(
  {} as TChatOpenUserIdContext
)
