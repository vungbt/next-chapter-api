import CategoryModel from '@/sequelize/models/category'
import { IModelBase } from './common'

export interface ICategory extends CategoryModel {}

export interface ICategoryAttributes extends IModelBase {
  slug: string
  name: string
  description?: string
  thumbnailId?: string
  userId: string
}
