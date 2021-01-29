import { useState, useEffect, ChangeEvent, useContext, useRef } from 'react'
import { Socket } from 'socket.io-client'

import { Input } from '@/components/Input'
import { User } from '@/types'

import { ChatOpener } from '../ChatOpener'
import { UnderlinedTitle } from '../UnderlinedTitle'
import { UsersContext } from '../../contexts'
import * as s from './styles'

type Props = { socket: Socket | null }

export const UserSearch = ({ socket }: Props) => {
  const [users, setUsers] = useContext(UsersContext)
  const [searchResult, setSearchResult] = useState<User[]>([])
  const inputRef = useRef<HTMLInputElement>(null)

  const hasResults = searchResult.length > 0
  let lastTimeout = 0

  useEffect(() => {
    if (!socket) return

    socket.on('userSearch', (payload: User[]) => {
      setSearchResult(payload)
    })
  }, [])

  function handleInputChange(event: ChangeEvent<HTMLInputElement>) {
    if (!socket) return

    const search = event.target.value

    if (search === '') {
      setSearchResult([])
    }

    clearTimeout(lastTimeout)

    lastTimeout = (setTimeout(() => {
      socket.emit('userSearch', {
        username: search,
        excludedUsernames: Object.values(users).map(user => user.username)
      })
    }, 1000) as unknown) as number
  }

  function handleChatOpenerClick(user: User) {
    setUsers(state => ({ ...state, [user.id]: user }))
    setSearchResult([])

    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  return (
    <s.UserSearch hasResults={hasResults}>
      <s.Top>
        <Input
          onChange={handleInputChange}
          placeholder="Search"
          icon="assets/search.svg"
          style={{ marginBottom: 10 }}
          ref={inputRef}
        />

        {hasResults && <UnderlinedTitle>Search results</UnderlinedTitle>}
      </s.Top>

      <s.ChatOpeners>
        {searchResult.map(user => (
          <ChatOpener key={user.id} user={user} onClick={handleChatOpenerClick} />
        ))}
      </s.ChatOpeners>
    </s.UserSearch>
  )
}
