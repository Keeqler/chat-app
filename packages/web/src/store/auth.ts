import create from 'zustand'

import { User } from '@/types'

type UseAuth = {
  jwt: string | null
  user: User | null
  signIn: (jwt: string, user: User) => void
  signOut: () => void
}

export const useAuth = create<UseAuth>(set => ({
  jwt: null,
  user: null,
  signIn: (jwt: string, user: User) => {
    localStorage.setItem('jwt', jwt)
    set({ jwt, user })
  },
  signOut: () => {
    localStorage.removeItem('jwt')
    set({ jwt: null, user: null })
  }
}))
