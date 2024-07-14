import CategoryModel from '@/sequelize/models/category'
import ContentModel from '@/sequelize/models/content'
import FileModel from '@/sequelize/models/file'
import UserModel from '@/sequelize/models/user'
import {
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
  const { q } = params

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
  const { name, description, publicId, userId } = body
  const slug = genSlug(name)
  let thumbnailId = undefined
  if (publicId) {
    const file = await FileServices.createFromStorageId(publicId)
    thumbnailId = file?.id
  }
  const data = await CategoryModel.update(
    {
      name,
      slug,
      userId,
      description,
      thumbnailId,
    },
    { where: { id } },
  )
  const updatedCategory = await CategoryModel.findByPk(id)

  return {
    data,
    updatedCategory,
  }
}

const remove = async (id: string) => {
  const data = await CategoryModel.destroy({ where: { id } })
  return {
    data,
  }
}
const findOne = async (
  options?: FindOptions<IUserAttributes> | undefined,
): Promise<ICategory | null> => {
  return CategoryModel.findOne(options)
}

export const CategoryServices = {
  list,
  create,
  findOne,
  update,
  remove,
}
