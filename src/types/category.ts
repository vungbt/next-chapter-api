import CategoryModel from '@/sequelize/models/category'
import { IModelBase } from './common'

export interface ICategory extends CategoryModel {}

export interface ICategoryAttributes extends IModelBase {
  slug: string
  name: string
  userId: string
  description?: string
  thumbnailId?: string
}

export interface IFindManyCategory {
  q?: string
}

export interface ICreateCategory {
  name: string
  userId: string
  description?: string
  publicId?: string
}
