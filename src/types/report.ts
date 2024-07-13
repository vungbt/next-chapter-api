import ReportModel from '@/sequelize/models/report'
import { IModelBase } from './common'

export interface IReport extends ReportModel {}

export enum EReportType {
  Normal = 'normal',
  Saying = 'saying',
}

export interface IReportAttributes extends IModelBase {
  userId: string
  contentId: string
  type?: EReportType
  content: string
}
