import { authorControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import pagingMiddleware from '@/middlewares/paginationMiddleware'
import { EUserRole } from '@/types'
import { AuthorValidations } from '@/validation/author'
import { Router } from 'express'
import express, { NextFunction } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, authorControllers.getAllAuthors)

router.post(
  '/',
  AuthorValidations.create,
  authenticateToken([EUserRole.Admin]),
  authorControllers.createAuthor,
)

router.get('/:id', pagingMiddleware, authorControllers.getAuthorById)

router.put(
  '/:id',
  AuthorValidations.create,
  authenticateToken([EUserRole.Admin]),
  authorControllers.updateAuthor,
)

router.delete(
  '/:id',
  authenticateToken([EUserRole.Admin]),
  authorControllers.removeAuthor,
)

export default router
