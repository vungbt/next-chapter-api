import ContentCategoryModel from '@/sequelize/models/content-category'
import { IModelBase } from './common'

export interface IContentCategory extends ContentCategoryModel {}

export interface IContentCategoryAttributes extends IModelBase {
  contentId: string
  categoryId: string
}
