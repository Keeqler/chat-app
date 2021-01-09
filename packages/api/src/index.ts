import 'express-async-errors'
import 'dotenv/config'

import './database/connection'
import './events'

import { httpServer } from './app'

httpServer.listen(process.env.PORT)
