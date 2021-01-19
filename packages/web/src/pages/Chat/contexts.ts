import { createContext, Dispatch, SetStateAction } from 'react'

import { TChatHistory } from '@/types'

type TChatHistoryContext = [TChatHistory, Dispatch<SetStateAction<TChatHistory>>]
type TChatOpenUserIdContext = [number | null, Dispatch<SetStateAction<number | null>>]

export const ChatHistoryContext = createContext<TChatHistoryContext>(
  (null as unknown) as TChatHistoryContext
)

export const ChatOpenUserIdContext = createContext<TChatOpenUserIdContext>(
  (null as unknown) as TChatOpenUserIdContext
)
