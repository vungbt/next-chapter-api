import UserModel from '@/sequelize/models/user'
import { EUserRole, IUser, IUserAttributes } from '@/types'
import { FindOptions } from 'sequelize'

const list = async () => {
  return await UserModel.findAll()
}

const create = async (userBody: {
  username: string
  password: string
  avatarUrl?: string
  role: EUserRole
}): Promise<IUser> => {
  return UserModel.create({ ...userBody })
}

const findOne = async (
  options?: FindOptions<IUserAttributes> | undefined,
): Promise<UserModel | null> => {
  return UserModel.findOne(options)
}

export const UserServices = {
  list,
  create,
  findOne,
}
