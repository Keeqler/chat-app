import { JwtPayload } from '@/types'

declare module 'express' {
  export interface Request {
    user?: JwtPayload
  }
}
