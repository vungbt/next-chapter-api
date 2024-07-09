import { IModelBase } from './common'

export enum EUserRole {
  Admin = 'admin',
  Customer = 'customer',
}

export interface IUserAttributes extends IModelBase {
  username: string
  password: string
  avatarUrl?: string
  role?: EUserRole
}
