import sequelize from '@/sequelize'
import { ICategoryAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import FileModel from './file'
import UserModel from './user'

class CategoryModel
  extends Model<ICategoryAttributes>
  implements ICategoryAttributes
{
  public id!: string
  public slug!: string
  public name!: string
  public description?: string
  public thumbnailId?: string
  public userId!: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

CategoryModel.init(
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
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'category',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

CategoryModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
CategoryModel.belongsTo(FileModel, {
  foreignKey: 'thumbnailId',
  as: 'thumbnail',
})
export default CategoryModel
