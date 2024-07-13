import ChapterContentModel from '@/sequelize/models/chapter-content'
import { IModelBase } from './common'

export interface IChapterContent extends ChapterContentModel {}

export interface IChapterContentAttributes extends IModelBase {
  chapterId: string
  fileId: string
}
