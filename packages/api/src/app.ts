import http from 'http'
import cors from 'cors'
import path from 'path'
import express from 'express'
import socketIo from 'socket.io'

import { routes } from './routes'
import { errorHandler } from './errors'

const app = express()

const origin = process.env.NODE_ENV === 'production' ? process.env.WEB_URL : '*'

app.use(cors({ origin }))
app.use(express.json())
app.use(routes)
app.use('/images', express.static(path.join(__dirname, '..', 'uploads')))
app.use(errorHandler)

export const httpServer = http.createServer(app)
export const io = new socketIo.Server(httpServer, { cors: { origin } })
