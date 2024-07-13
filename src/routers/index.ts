import express from 'express'
import auth from './auth'
import users from './users'
import files from './files'
import { HttpStatus } from '@/constants'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/files', files)
router.all('*', (_, res) =>
  res.jsonApi(HttpStatus.OK, { message: 'message:hello_api' }),
)

export default router
