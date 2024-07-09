import { UserServices } from '@services'
import express from 'express'

const getAllUser = async (req: express.Request, res: express.Response) => {
  try {
    const users = await UserServices.list()
    return res.status(200).json({ data: users })
  } catch (error) {
    return res.sendStatus(400)
  }
}

const createUser = async (req: express.Request, res: express.Response) => {
  try {
    const { body } = req
    const user = await UserServices.create(body)
    return res.status(200).json({ data: user })
  } catch (error) {
    return res.sendStatus(400)
  }
}

export const UserControllers = {
  getAllUser,
  createUser,
}
