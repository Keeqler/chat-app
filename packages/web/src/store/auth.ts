import create from 'zustand'

import { JwtPayload } from '@/types'

type UseAuth = {
  jwt: string | null
  user: JwtPayload | null
  signIn: (jwt: string, user: JwtPayload) => void
}

export const useAuth = create<UseAuth>(set => ({
  jwt: null,
  user: null,
  signIn: (jwt: string, user: JwtPayload) => {
    localStorage.setItem('jwt', jwt)

    set({ jwt, user })
  }
}))
