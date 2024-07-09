import UserModel from '@models/user'
import { IUserAttributes } from '@types'

export interface IJwtRes {
  accessToken: string
  refreshToken: string
  expires: string
}

export interface ISignUpArgs
  extends Pick<IUserAttributes, 'username' | 'password' | 'role'> {}

export interface ISignUpRes {
  user: UserModel
  jwt: IJwtRes
}

export interface ISignInRes {
  user: UserModel
  jwt: IJwtRes
}

export interface ISignInArgs {
  username: string
  password: string
}
