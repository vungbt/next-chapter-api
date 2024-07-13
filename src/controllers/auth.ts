import { HttpStatus } from '@/constants'
import { AuthServices } from '@/services'
import { NextFunction, Request, Response } from 'express'

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const signInRes = await AuthServices.signIn(body)
    return res.jsonApi(HttpStatus.OK, { data: signInRes })
  } catch (error) {
    next(error)
  }
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const signUpRes = await AuthServices.signUp(body)
    return res.jsonApi(HttpStatus.OK, { data: signUpRes })
  } catch (error) {
    next(error)
  }
}

const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { auth } = req
    const result = await AuthServices.me(auth?.id ?? '')
    return res.jsonApi(HttpStatus.OK, result)
  } catch (error) {
    next(error)
  }
}

export const AuthControllers = {
  signIn,
  signUp,
  getMe,
}
