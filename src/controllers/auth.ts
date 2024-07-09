import { AuthServices } from '@services'
import { NextFunction, Request, Response } from 'express'

const signIn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const signInRes = await AuthServices.signIn(body)
    return res.status(200).json({ data: signInRes })
  } catch (error) {
    next(error)
  }
}

const signUp = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { body } = req
    const signUpRes = await AuthServices.signUp(body)
    return res.status(200).json({ data: signUpRes })
  } catch (error) {
    next(error)
  }
}

export const AuthControllers = {
  signIn,
  signUp,
}
