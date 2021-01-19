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

export type TChatHistory = Record<
  string,
  { user: User; lastMessage: Message | null; messages: Message[] }
>
