import CategoryModel from '@/sequelize/models/category'
import ContentModel from '@/sequelize/models/content'
import FileModel from '@/sequelize/models/file'
import UserModel from '@/sequelize/models/user'
import {
  EOrder,
  ICategory,
  ICategoryAttributes,
  ICreateCategory,
  IFindManyCategory,
  IPaginationReq,
  IUserAttributes,
} from '@/types'
import { genSlug, resPagination } from '@/utils/helpers'
import { FindOptions, Op, WhereOptions } from 'sequelize'
import { FileServices } from './files'

const list = async (params: IFindManyCategory, pagination: IPaginationReq) => {
  const { page, pageSize, limit, offset } = pagination
  const { q, orders } = params

  const whereCondition: WhereOptions<ICategoryAttributes> = {
    name: { [Op.iLike]: `%${q}%` },
  }

  const { count, rows } = await CategoryModel.findAndCountAll({
    offset,
    limit,
    where: whereCondition,
    include: [
      {
        model: FileModel,
        as: 'thumbnail',
      },
      {
        model: UserModel,
        as: 'user',
      },
      {
        model: ContentModel,
        as: 'contents',
      },
    ],
    order: orders,
  })
  const paginationRes = resPagination(count, pagination)

  return {
    data: rows,
    page,
    pageSize,
    ...paginationRes,
  }
}

const create = async (body: ICreateCategory): Promise<{ data: ICategory }> => {
  const { name, description, publicId, userId } = body
  const slug = genSlug(name)
  let thumbnailId = undefined
  if (publicId) {
    const file = await FileServices.createFromStorageId(publicId)
    thumbnailId = file?.id
  }
  const data = await CategoryModel.create({
    name,
    slug,
    userId,
    description,
    thumbnailId,
  })

  return {
    data,
  }
}

const update = async (id: string, body: ICreateCategory) => {
  const { name, description, publicId } = body
  const slug = genSlug(name)
  let thumbnailId = undefined
  if (publicId) {
    const file = await FileServices.createFromStorageId(publicId)
    thumbnailId = file?.id
  }
  const [affectedCount] = await CategoryModel.update(
    {
      name,
      slug,
      description,
      thumbnailId,
    },
    { where: { id } },
  )

  let data = null
  if (affectedCount > 0) {
    data = await CategoryModel.findByPk(id)
  }

  return {
    data,
  }
}

const remove = async (id: string) => {
  const affectedCount = await CategoryModel.destroy({ where: { id } })
  let data = null
  if (affectedCount > 0) {
    data = await CategoryModel.findByPk(id)
  }
  return {
    data,
  }
}

const findOne = async (options?: FindOptions<IUserAttributes> | undefined) => {
  const data = CategoryModel.findOne(options)
  return {
    data,
  }
}

const getCategoryById = async (id: string) => {
  const data = await CategoryModel.findByPk(id, {
    include: [
      {
        model: FileModel,
        as: 'thumbnail',
      },
    ],
  })
  return {
    data,
  }
}

export const CategoryServices = {
  list,
  create,
  findOne,
  update,
  remove,
  getCategoryById,
}
