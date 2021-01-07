import 'express-async-errors'

import dotenv from 'dotenv'

import './database/connection'
import './events'

import { httpServer } from './app'

dotenv.config({ path: `.env.${process.env.NODE_ENV}` })

httpServer.listen(process.env.PORT)
