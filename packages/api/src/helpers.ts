import jwt from 'jsonwebtoken'
import lodash from 'lodash'

import { User } from './entities/User'

export const generateJwt = (user: User) =>
  jwt.sign(
    lodash.pick(user, ['id', 'username', 'avatar', 'createdAt', 'updatedAt']),
    process.env.JWT_SECRET
  )
