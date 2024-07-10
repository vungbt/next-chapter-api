import validator from '@/validation'
import { NextFunction, Request, Response } from 'express'

const signIn = async (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      username: 'required',
      password: 'required',
    },
  })

const signUp = async (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      username: 'required|unique:user,username',
      password: 'required',
    },
  })

export const AuthValidations = {
  signIn,
  signUp,
}
