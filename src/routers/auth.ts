import { AuthControllers } from '@/controllers'
import { authenticateToken } from '@/middlewares/authMiddleware'
import { AuthValidations } from '@/validation'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/sign-in', AuthValidations.signIn, AuthControllers.signIn)
router.post('/sign-up', AuthValidations.signUp, AuthControllers.signUp)
router.get('/me', authenticateToken(), AuthControllers.getMe)

export default router
