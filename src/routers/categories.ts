import { CategoryControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import pagingMiddleware from '@/middlewares/paginationMiddleware'
import { EUserRole } from '@/types'
import { CategoryValidations } from '@/validation/category'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, CategoryControllers.getAllCategory)
router.get('/:id', pagingMiddleware, CategoryControllers.getCategoryById)
router.post(
  '/',
  CategoryValidations.create,
  authenticateToken([EUserRole.Admin]),
  CategoryControllers.createCategory,
)
router.put(
  '/:id',
  CategoryValidations.create,
  authenticateToken([EUserRole.Admin]),
  CategoryControllers.updateCategory,
)
router.delete(
  '/:id',
  authenticateToken([EUserRole.Admin]),
  CategoryControllers.removeCategory,
)
export default router
