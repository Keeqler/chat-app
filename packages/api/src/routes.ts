import { Router } from 'express'

import { UserController } from '@/controllers/UserController'
import { processUpload } from '@/middlewares/UploadProcessMiddleware'
import { validateInputs } from '@/middlewares/InputValidationMiddleware'

import { UserValidators } from './validators/UserValidators'
import { AuthValidators } from './validators/AuthValidators'
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

routes.post('/users/auth', validateInputs(AuthValidators.store), AuthController.store)

/**
 * /messages endpoint
 */
