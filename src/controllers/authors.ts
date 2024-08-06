import { HttpStatus } from '@/constants'
import { AuthorServices } from '@/services/authors'
import { ICreateAuthor, IFindManyAuthor } from '@/types'
import express, { NextFunction } from 'express'

const getAllAuthors = async (
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

const createAuthor = async (
  req: express.Request<{}, {}, ICreateAuthor>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { body, auth } = req
    const result = await AuthorServices.create({ ...body })
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

const updateAuthor = async (
  req: express.Request<{ id: string }, {}, ICreateAuthor>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const { body, auth } = req
    const result = await AuthorServices.update(id, { ...body })
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

const getAuthorById = async (
  req: express.Request,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await AuthorServices.getAuthorById(id)
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

const removeAuthor = async (
  req: express.Request<{ id: string }>,
  res: express.Response,
  next: NextFunction,
) => {
  try {
    const { id } = req.params
    const result = await AuthorServices.remove(id)
    return res.jsonApi(HttpStatus.OK, { ...result })
  } catch (error) {
    next(error)
  }
}

export const authorControllers = {
  getAllAuthors,
  createAuthor,
  getAuthorById,
  updateAuthor,
  removeAuthor,
}
