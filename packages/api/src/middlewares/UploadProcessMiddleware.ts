import multer from 'multer'
import path from 'path'
import util from 'util'
import crypto from 'crypto'
import { HttpError } from '@/errors'

export const processUpload = multer({
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.mimetype.split('/')[0] === 'image') {
      return callback(null, true)
    }

    callback(new HttpError(400, 'File is not an image'))
  },
  storage: multer.diskStorage({
    destination: path.join(__dirname, '..', '..', 'uploads'),
    filename: async (request, file, callback) => {
      const filename = (await util.promisify(crypto.randomBytes)(16)).toString('hex')

      callback(null, filename)
    }
  })
})
