import AuthorModel from '@/sequelize/models/author'
import {
  IAuthor,
  IAuthorAttributes,
  ICreateAuthor,
  IFindManyAuthor,
  IPaginationReq,
} from '@/types'
import { FileServices } from './files'
import { Op, WhereOptions } from 'sequelize'
import { resPagination } from '@/utils/helpers'
import FileModel from '@/sequelize/models/file'

const list = async (params: IFindManyAuthor, pagination: IPaginationReq) => {
  const { page, pageSize, limit, offset } = pagination
  const { q } = params

  const whereCondition: WhereOptions<IAuthorAttributes> = {
    fullName: { [Op.iLike]: `%${q}%` },
  }

  const { count, rows } = await AuthorModel.findAndCountAll({
    offset,
    limit,
    where: whereCondition,
    include: [
      {
        model: FileModel,
        as: 'thumbnail',
      },
      {
        model: FileModel,
        as: 'avatar',
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

const create = async (body: ICreateAuthor): Promise<{ data: IAuthor }> => {
  const { fullName, avatarUrlId, thumbnailUrlId } = body
  let thumbnailId = undefined
  if (thumbnailUrlId) {
    const file = await FileServices.createFromStorageId(thumbnailUrlId)
    thumbnailId = file?.id
  }
  let avatarId = undefined
  if (avatarUrlId) {
    const file = await FileServices.createFromStorageId(avatarUrlId)
    avatarId = file?.id
  }
  const data = await AuthorModel.create({
    fullName,
    avatarId,
    thumbnailId,
  })
  return {
    data,
  }
}

const update = async (id: string, body: ICreateAuthor) => {
  const { fullName, avatarUrlId, thumbnailUrlId } = body
  let thumbnailId = undefined
  if (thumbnailUrlId) {
    const file = await FileServices.createFromStorageId(thumbnailUrlId)
    thumbnailId = file?.id
  }
  let avatarId = undefined
  if (avatarUrlId) {
    const file = await FileServices.createFromStorageId(avatarUrlId)
    avatarId = file?.id
  }
  const data = await AuthorModel.update(
    {
      fullName,
      avatarId,
      thumbnailId,
    },
    { where: { id } },
  )
  return {
    data,
  }
}

const getAuthorById = async (id: string) => {
  const data = await AuthorModel.findByPk(id, {
    include: [
      {
        model: FileModel,
        as: 'thumbnail',
      },
      {
        model: FileModel,
        as: 'avatar',
      },
    ],
  })
  return {
    data,
  }
}

const remove = async (id: string) => {
  const data = await AuthorModel.destroy({ where: { id } })
  return {
    data,
  }
}

export const AuthorServices = {
  list,
  create,
  getAuthorById,
  update,
  remove,
}
