import User from '@models/user'
import { EUserRole, IUserAttributes } from '@types'
import { FindOptions } from 'sequelize'

const list = async () => {
  return await User.findAll()
}

const create = async (userBody: {
  username: string
  password: string
  avatarUrl?: string
  role: EUserRole
}): Promise<User> => {
  return User.create({ ...userBody })
}

const findOne = async (
  options?: FindOptions<IUserAttributes> | undefined,
): Promise<User | null> => {
  return User.findOne(options)
}

export const UserServices = {
  list,
  create,
  findOne,
}
