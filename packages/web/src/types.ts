export type User = {
  id: number
  username: string
  avatar: string
  createdAt: string
  updatedAt: string
}

export type Message = {
  id: number
  message: string
  sender: User
  receiver: User
  createdAt: string
  updatedAt: string
}

export type UsersState = { [userId: number]: User }
export type MessagesState = { [userId: number]: Message[] }
export type OnlineStatusesState = { [userId: number]: boolean }
export type ChatOpenUserIdState = number
