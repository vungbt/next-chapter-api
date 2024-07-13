import sequelize from '@/sequelize'
import { EContentType, IContentAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import CategoryModel from './category'
import AuthorModel from './author'
import FileModel from './file'
import ContentCategoryModel from './content-category'

class ContentModel
  extends Model<IContentAttributes>
  implements IContentAttributes
{
  public id!: string
  public slug!: string
  public name!: string
  public description?: string
  public thumbnailId?: string
  public userId!: string
  public authorId!: string
  public totalPage!: number
  public pageType!: EContentType
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

ContentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnailId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    authorId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    pageType: {
      type: DataTypes.ENUM(EContentType.Page, EContentType.Chapter),
      allowNull: false,
    },
    totalPage: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'content',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

ContentModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
ContentModel.belongsTo(AuthorModel, { as: 'author', foreignKey: 'authorId' })
ContentModel.belongsTo(FileModel, {
  foreignKey: 'thumbnailId',
  as: 'thumbnail',
})

ContentModel.belongsToMany(CategoryModel, {
  through: ContentCategoryModel,
  as: 'categories',
  foreignKey: 'contentId',
  otherKey: 'categoryId',
})
CategoryModel.belongsToMany(ContentModel, {
  through: ContentCategoryModel,
  as: 'contents',
  foreignKey: 'categoryId',
  otherKey: 'contentId',
})

export default ContentModel
