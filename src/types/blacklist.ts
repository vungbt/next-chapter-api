import BlacklistModel from '@/sequelize/models/blacklist'
import { IModelBase } from './common'

export interface IBlacklist extends BlacklistModel {}

export interface IBlacklistAttributes extends IModelBase {
  userId: string
  contentId: string
}
