import express from 'express'

import users from './users'
import auth from './auth'
import NotFound from '@/utils/errors/NotFound'

const router = express.Router()

router.use('/auth', auth)
router.use('/users', users)
router.all('*', () => {
  throw new NotFound()
})

export default router
