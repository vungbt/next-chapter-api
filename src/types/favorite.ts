import FavoriteModel from '@/sequelize/models/favorite'
import { IModelBase } from './common'

export interface IFavorite extends FavoriteModel {}

export interface IFavoriteAttributes extends IModelBase {
  userId: string
  contentId: string
}
