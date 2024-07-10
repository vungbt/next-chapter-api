import sequelize from '@/sequelize'
import { ICategoryAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class CategoryModel
  extends Model<ICategoryAttributes>
  implements ICategoryAttributes
{
  public id!: string
  public slug!: string
  public name!: string
  public description?: string
  public thumbnail?: string
  public createdById!: string
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
    thumbnail: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdById: {
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

CategoryModel.belongsTo(UserModel, { as: 'user', foreignKey: 'createdById' })
CategoryModel.belongsToMany(ContentModel, {
  through: 'ContentCategories',
  as: 'contents',
  foreignKey: 'categoryId',
})
export default CategoryModel
