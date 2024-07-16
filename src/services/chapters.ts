import ChapterModel from '@/sequelize/models/chapter'
import ContentModel from '@/sequelize/models/content'
import FileModel from '@/sequelize/models/file'
import UserModel from '@/sequelize/models/user'
import {
  ICategoryAttributes,
  IChapter,
  ICreateChapter,
  IFindManyCategory,
  IPaginationReq,
} from '@/types'
import { resPagination } from '@/utils/helpers'
import { Op, WhereOptions } from 'sequelize'

const list = async (params: IFindManyCategory, pagination: IPaginationReq) => {
  const { page, pageSize, limit, offset } = pagination
  const { q } = params

  const whereCondition: WhereOptions<ICategoryAttributes> = {
    name: { [Op.iLike]: `%${q}%` },
  }

  const { count, rows } = await ChapterModel.findAndCountAll({
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

const create = async (body: ICreateChapter): Promise<{ data: IChapter[] }> => {
  const { name, images } = body
  // const chapter = await ChapterModel.create(
  //   {
  //     name,
  //     userId,
  //     contentId,
  //   },
  //   { transaction }
  // );
  // if (publicId) {

  // }
  // const data = await ChapterModel.create({
  //   name,
  //   slug,
  //   userId,
  //   description,
  //   thumbnailId,
  // })

  return {
    data: [],
  }
}

export const CategoryServices = {
  list,
  create,
}
