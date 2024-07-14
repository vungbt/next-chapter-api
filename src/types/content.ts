import ContentModel from '@/sequelize/models/content'
import { IModelBase } from './common'

export enum EContentType {
  Page = 'page',
  Chapter = 'chapter',
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
}
