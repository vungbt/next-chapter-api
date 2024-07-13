import NotFound from '@/utils/errors/NotFound copy'
import { CloudinaryServices } from './cloudinary'
import FileModel from '@/sequelize/models/file'
import { ICreateFileOptions, IFileCloudinary } from '@/types'
import pick from 'lodash/pick'
import env from '@/configs/env'

const uploadUrl = async (name?: string) => {
  if (!name) throw new NotFound()
  return CloudinaryServices.uploadUrl(name)
}

const uploadUrls = async (names: string[]) => {
  return Promise.all(names.map((item) => CloudinaryServices.uploadUrl(item)))
}

const createFromStorageId = async (
  id: string,
  options: ICreateFileOptions = {
    folder: env.folder.assets,
  },
) => {
  try {
    let storageFile: IFileCloudinary
    if (options?.folder) {
      storageFile = await CloudinaryServices.moveFile(id, options.folder)
    } else {
      storageFile = await CloudinaryServices.getInfo(id)
    }
    if (storageFile) {
      return FileModel.create({
        url: storageFile.url,
        storageId: storageFile.public_id,
        metadata: pick(storageFile, [
          'format',
          'resource_type',
          'bytes',
          'height',
          'width',
        ]),
        ...(options?.data || {}),
      })
    }
    throw new NotFound()
  } catch (error) {}
}

export const FileServices = {
  uploadUrl,
  createFromStorageId,
  uploadUrls,
}
