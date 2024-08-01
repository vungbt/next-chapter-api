import { ContentControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import pagingMiddleware from '@/middlewares/paginationMiddleware'
import { EUserRole } from '@/types'
import { ContentValidations } from '@/validation/content'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, ContentControllers.getAllContent)
router.post(
  '/',
  ContentValidations.create,
  authenticateToken([EUserRole.Admin]),
  ContentControllers.createContent,
)

export default router
