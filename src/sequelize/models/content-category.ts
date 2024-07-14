import sequelize from '@/sequelize'
import { IContentCategoryAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import CategoryModel from './category'
import ContentModel from './content'

class ContentCategoryModel
  extends Model<IContentCategoryAttributes>
  implements IContentCategoryAttributes
{
  public id!: string
  public contentId!: string
  public categoryId!: string
}

ContentCategoryModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: CategoryModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: ContentModel,
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  },
  {
    sequelize,
    modelName: 'content_category',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

export default ContentCategoryModel
