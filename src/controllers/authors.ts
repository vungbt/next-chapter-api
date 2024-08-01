import { HttpStatus } from '@/constants'
import { AuthorServices } from '@/services'
import { IFindManyAuthor } from '@/types'
import express, { NextFunction } from 'express'

const getAllAuthor = async (
  req: express.Request<{}, {}, {}, IFindManyAuthor>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const queries = req.query
    const pagination = req.pagination
    const result = await AuthorServices.list(queries, pagination)
    return res.jsonApi(HttpStatus.OK, result)
  } catch (error) {
    next(error)
  }
}

export const AuthorControllers = {
  getAllAuthor,
}
