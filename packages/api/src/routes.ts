import { Router } from 'express'

import { UserController } from '@/controllers/UserController'
import { processUpload } from '@/middlewares/UploadProcessMiddleware'
import { validateInputs } from '@/middlewares/InputValidationMiddleware'
import { AuthorizationMiddleware } from '@/middlewares/AuthorizationMiddleware'

import { UserValidators } from './validators/UserValidators'
import { MessageValidators } from './validators/MessageValidators'
import { AuthValidators } from './validators/AuthValidators'
import { MessageController } from './controllers/MessageController'
import { MessageHistoryController } from './controllers/MessageHistoryController'
import { AuthController } from './controllers/AuthController'

export const routes = Router()

/**
 * /users endpoint
 */

routes.post(
  '/users',
  processUpload.single('avatar'),
  validateInputs(UserValidators.store),
  UserController.store
)

routes.get('/users', validateInputs(UserValidators.index), UserController.index)
routes.post('/users/auth', validateInputs(AuthValidators.store), AuthController.store)

/**
 * /messages endpoint
 */

routes.get(
  '/messages',
  AuthorizationMiddleware,
  validateInputs(MessageValidators.index),
  MessageController.index
)

routes.get('/messages/history', AuthorizationMiddleware, MessageHistoryController.index)
