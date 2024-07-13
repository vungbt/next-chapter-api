import { IModelBase } from './common'
import FileModel from '@/sequelize/models/file'

export enum EProvider {
  S3 = 's3',
  Cloudinary = 'cloudinary',
  System = 'system',
}

export interface IFile extends FileModel {}

export interface IFileAttributes extends IModelBase {
  url?: string
  storageId: string
  provider?: EProvider
  metadata?: any
}

export interface ICreateFileOptions {
  folder?: string
  data?: IFile
}

export interface IFileCloudinary {
  public_id: string
  version: number
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  tags: string[]
  bytes: number
  type: string
  url: string
  secure_url: string
  access_mode: string
}
