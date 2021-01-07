import { User } from '@/entities/User'

export type JwtPayload = Pick<User, 'id' | 'username' | 'avatar' | 'createdAt' | 'updatedAt'>
