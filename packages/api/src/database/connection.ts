import { createConnection } from 'typeorm'

import { Message } from '@/entities/Message'
import { User } from '@/entities/User'

createConnection({
  type: 'sqlite',
  database: './database.sqlite',
  entities: [User, Message]
})
