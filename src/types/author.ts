import AuthorModel from '@/sequelize/models/author'
import { IModelBase } from './common'

export interface IAuthor extends AuthorModel {}

export interface IAuthorAttributes extends IModelBase {
  fullName: string
  avatarId?: string
  thumbnailId?: string
}
