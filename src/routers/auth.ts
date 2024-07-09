import { AuthControllers } from '@controllers'
import { AuthValidations } from '@validation'
import express, { Router } from 'express'

const router: Router = express.Router()

router.post('/sign-in', AuthValidations.signIn, AuthControllers.signIn)
router.post('/sign-up', AuthValidations.signUp, AuthControllers.signUp)

export default router
