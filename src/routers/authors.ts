import { AuthorControllers } from '@/controllers'
import pagingMiddleware from '@/middlewares/paginationMiddleware'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, AuthorControllers.getAllAuthor)

export default router
