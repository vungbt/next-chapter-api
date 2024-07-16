import AuthorModel from '@/sequelize/models/author'
import CategoryModel from '@/sequelize/models/category'
import ContentModel from '@/sequelize/models/content'
import FileModel from '@/sequelize/models/file'
import UserModel from '@/sequelize/models/user'
import {
  IContent,
  IContentAttributes,
  ICreateContent,
  IFindManyCategory,
  IPaginationReq,
} from '@/types'
import { genSlug, resPagination } from '@/utils/helpers'
import { Op, WhereOptions } from 'sequelize'
import { FileServices } from './files'

const list = async (params: IFindManyCategory, pagination: IPaginationReq) => {
  const { page, pageSize, limit, offset } = pagination
  const { q } = params

  const whereCondition: WhereOptions<IContentAttributes> = {
    name: { [Op.iLike]: `%${q}%` },
  }

  const { count, rows } = await ContentModel.findAndCountAll({
    offset,
    limit,
    where: whereCondition,
    include: [
      {
        model: CategoryModel,
        as: 'categories',
      },
      {
        model: FileModel,
        as: 'thumbnail',
      },
      {
        model: UserModel,
        as: 'user',
      },
      {
        model: AuthorModel,
        as: 'author',
      },
    ],
  })
  const paginationRes = resPagination(count, pagination)

  return {
    data: rows,
    page,
    pageSize,
    ...paginationRes,
  }
}

const create = async (body: ICreateContent): Promise<{ data: IContent }> => {
  const { name, description, publicId, userId, authorId, pageType, status } =
    body
  const slug = genSlug(name)
  let thumbnailId = undefined
  if (publicId) {
    const file = await FileServices.createFromStorageId(publicId)
    thumbnailId = file?.id
  }
  const data = await ContentModel.create({
    name,
    slug,
    userId,
    authorId,
    description,
    thumbnailId,
    pageType,
    status,
  })

  return {
    data,
  }
}

export const ContentServices = {
  list,
  create,
}
