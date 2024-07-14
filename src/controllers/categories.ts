import { HttpStatus } from '@/constants'
import { CategoryServices } from '@/services'
import { ICreateCategory, IFindManyCategory } from '@/types'
import express, { NextFunction } from 'express'
import { validate as isUUID } from 'uuid'

const getAllCategory = async (
  req: express.Request<{}, {}, {}, IFindManyCategory>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const queries = req.query
    const pagination = req.pagination
    const result = await CategoryServices.list(queries, pagination)
    return res.jsonApi(HttpStatus.OK, result)
  } catch (error) {
    next(error)
  }
}

const createCategory = async (
  req: express.Request<{}, {}, ICreateCategory>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { body, auth } = req
    const userId = auth?.id ?? ''
    const result = await CategoryServices.create({ ...body, userId })
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}
const updateCategory = async (
  req: express.Request<{ id: string }, {}, ICreateCategory>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { body, auth } = req
    const userId = auth?.id ?? ''
    const result = await CategoryServices.update(id, { ...body, userId })
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

const removeCategory = async (
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await CategoryServices.remove(id)
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

export const CategoryControllers = {
  getAllCategory,
  createCategory,
  updateCategory,
  removeCategory,
}
