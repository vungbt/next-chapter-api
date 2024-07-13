import express from 'express'
import auth from './auth'
import users from './users'
import files from './files'
import categories from './categories'
import { HttpStatus } from '@/constants'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.use('/files', files)
router.use('/categories', categories)
router.all('*', (_, res) =>
  res.jsonApi(HttpStatus.OK, { message: 'message:hello_api' }),
)

export default router
