import CategoryModel from '@/sequelize/models/category'
import { IModelBase, IRequestBase } from './common'

export interface ICategory extends CategoryModel {}

export interface ICategoryAttributes extends IModelBase {
  slug: string
  name: string
  userId: string
  description?: string
  thumbnailId?: string
}

export interface IFindManyCategory extends IRequestBase {
  q?: string
}

export interface ICreateCategory {
  name: string
  userId: string
  description?: string
  publicId?: string
}
