import express from 'express'
import auth from './auth'
import users from './users'
import { HttpStatus } from '@/constants'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.all('*', (_, res) =>
  res.jsonApi(HttpStatus.OK, { message: 'message:hello_api' }),
)

export default router
