import AuthorModel from '@/sequelize/models/author'
import { IModelBase } from './common'

export interface IAuthor extends AuthorModel {}

export interface IAuthorAttributes extends IModelBase {
  fullName: string
  avatarId?: string
  thumbnailId?: string
}

export interface ICreateAuthor {
  fullName: string
  avatarUrlId?: string
  thumbnailUrlId?: string
}

export interface IFindManyAuthor {
  q?: string
}
