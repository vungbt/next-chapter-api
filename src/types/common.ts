import { Order } from 'sequelize'

export interface IModelBase {
  id?: string
  createdAt?: Date
  updatedAt?: Date
  deletedAt?: Date
}

export interface IPaginationReq {
  page?: number
  pageSize?: number
  offset?: number
  limit?: number
}

export interface IRequestBase {
  orders?: Order
}

export enum EOrder {
  DESC = 'desc',
  ASC = 'asc',
}
