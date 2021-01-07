import { Router } from 'express'

import { UserController } from '@/controllers/UserController'
import { processUpload } from '@/middlewares/UploadProcessMiddleware'
import { validateInputs } from '@/middlewares/InputValidationMiddleware'
import { AuthorizationMiddleware } from '@/middlewares/AuthorizationMiddleware'

import { UserValidators } from './validators/UserValidators'
import { MessageValidators } from './validators/MessageValidators'
import { MessageController } from './controllers/MessageController'
import { MessageHistoryController } from './controllers/MessageHistoryController'

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
