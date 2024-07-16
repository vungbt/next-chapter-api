import ContentModel from '@/sequelize/models/content'
import { IModelBase } from './common'

export enum EContentType {
  Page = 'page',
  Chapter = 'chapter',
}

export enum EContentStatus {
  Pending = 'pending',
  Finish = 'finish',
  Coming = 'coming',
}

export interface IContent extends ContentModel {}

export interface IContentAttributes extends IModelBase {
  slug: string
  name: string
  description?: string
  thumbnailId?: string
  authorId: string
  userId: string
  pageType: EContentType
  status?: EContentStatus
}

export interface ICreateContent {
  name: string
  description?: string
  publicId?: string
  authorId: string
  userId: string
  pageType: EContentType
  status?: EContentStatus
}

export interface IFindManyContent {
  q?: string
}
