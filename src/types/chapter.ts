import CategoryModel from '@/sequelize/models/category'
import { IModelBase } from './common'

export interface IChapter extends CategoryModel {}

export interface IChapterAttributes extends IModelBase {
  contentId?: string
  userId: string
  name: string
}

export interface ICreateChapter {
  name: string
  images: string[]
}
