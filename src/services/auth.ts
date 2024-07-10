import UserModel from '@/sequelize/models/user'
import { Payload } from '@/type'
import {
  EUserRole,
  ISignInArgs,
  ISignInRes,
  ISignUpArgs,
  ISignUpRes,
} from '@/types'
import ArgumentError from '@/utils/errors/ArgumentError'
import ConflictError from '@/utils/errors/ConflictError'
import { hashPassword } from '@/utils/helpers'
import { signJwt } from '@/utils/jwt'
import bcrypt from 'bcrypt'

const signUp = async (args: ISignUpArgs): Promise<ISignUpRes> => {
  const { username, password, role = EUserRole.Customer } = args
  const userValid = await UserModel.findOne({ where: { username } })
  if (userValid) throw new ConflictError('user_conflict')
  const hashedPassword = hashPassword(password)
  const user = await UserModel.create({
    username,
    password: hashedPassword,
    role,
  })

  const payload: Payload = { id: user.id, type: role }
  const jwt = signJwt(payload)

  return {
    user,
    jwt,
  }
}

const signIn = async (args: ISignInArgs): Promise<ISignInRes> => {
  const { username, password } = args
  const user = await UserModel.findOne({ where: { username } })

  if (user && (await bcrypt.compare(password, user.password))) {
    const payload: Payload = { id: user.id, type: user.role }
    const jwt = signJwt(payload)

    return {
      user,
      jwt,
    }
  }

  throw new ArgumentError('username_or_password_invalid')
}

export const AuthServices = {
  signUp,
  signIn,
}
