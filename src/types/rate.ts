import RateModel from '@/sequelize/models/rate'
import { IModelBase } from './common'

export interface IRate extends RateModel {}

export interface IRateAttributes extends IModelBase {
  userId: string
  contentId: string
  rate: number
}
