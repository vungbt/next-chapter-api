import { HttpStatus } from '@/constants'
import { ContentServices } from '@/services'
import { ICreateContent, IFindManyContent } from '@/types'
import express, { NextFunction } from 'express'

const getAllContent = async (
  req: express.Request<{}, {}, {}, IFindManyContent>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const queries = req.query
    const pagination = req.pagination
    const result = await ContentServices.list(queries, pagination)
    return res.jsonApi(HttpStatus.OK, result)
  } catch (error) {
    next(error)
  }
}

const createContent = async (
  req: express.Request<{}, {}, ICreateContent>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { body, auth } = req
    const userId = auth?.id ?? ''
    const result = await ContentServices.create({ ...body, userId })
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

export const ContentControllers = {
  getAllContent,
  createContent,
}
