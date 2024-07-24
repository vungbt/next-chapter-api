import validator from '@/validation'
import { NextFunction, Request, Response } from 'express'

const create = async (req: Request, res: Response, next: NextFunction) =>
  validator(req, res, next, {
    data: req.body,
    rules: {
      fullName: 'required',
    },
  })

export const AuthorValidations = {
  create,
}
