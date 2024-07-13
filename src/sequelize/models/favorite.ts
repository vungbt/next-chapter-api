import sequelize from '@/sequelize'
import { IFavoriteAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class FavoriteModel
  extends Model<IFavoriteAttributes>
  implements IFavoriteAttributes
{
  public id!: string
  public userId!: string
  public contentId!: string
}

FavoriteModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'user',
        key: 'id',
      },
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'content',
        key: 'id',
      },
    },
  },
  {
    sequelize,
    modelName: 'favorite',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

FavoriteModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
UserModel.hasMany(FavoriteModel, {
  foreignKey: 'userId',
  as: 'favorites',
  onDelete: 'CASCADE',
  hooks: true,
})
FavoriteModel.belongsTo(ContentModel, {
  as: 'content',
  foreignKey: 'contentId',
})
ContentModel.hasMany(FavoriteModel, {
  foreignKey: 'contentId',
  as: 'favorites',
  onDelete: 'CASCADE',
  hooks: true,
})
export default FavoriteModel
