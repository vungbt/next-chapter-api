import { UserControllers } from '@controllers'
import pagingMiddleware from '@middlewares/paginationMiddleware'
import express, { Router } from 'express'

const router: Router = express.Router()

router.get('/', pagingMiddleware, UserControllers.getAllUser)
router.post('/', UserControllers.createUser)

export default router
