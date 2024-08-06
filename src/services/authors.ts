import AuthorModel from '@/sequelize/models/author'
import ContentModel from '@/sequelize/models/content'
import FileModel from '@/sequelize/models/file'
import UserModel from '@/sequelize/models/user'
import { IAuthorAttributes, IFindManyAuthor, IPaginationReq } from '@/types'
import { resPagination } from '@/utils/helpers'
import { Op, WhereOptions } from 'sequelize'

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
  })
  const paginationRes = resPagination(count, pagination)

  return {
    data: rows,
    page,
    pageSize,
    ...paginationRes,
  }
}

export const AuthorServices = {
  list,
}
