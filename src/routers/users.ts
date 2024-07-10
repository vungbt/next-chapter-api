import { UserControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import pagingMiddleware from '@/middlewares/paginationMiddleware'
import { EUserRole } from '@/types'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get(
  '/',
  authenticateToken([EUserRole.Admin]),
  pagingMiddleware,
  UserControllers.getAllUser,
)
router.post(
  '/',
  authenticateToken([EUserRole.Admin]),
  UserControllers.createUser,
)

export default router
