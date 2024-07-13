import sequelize from '@/sequelize'
import { IBlacklistAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class BlacklistModel
  extends Model<IBlacklistAttributes>
  implements IBlacklistAttributes
{
  public id!: string
  public userId!: string
  public contentId!: string
}

BlacklistModel.init(
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
    modelName: 'blacklist',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

BlacklistModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
UserModel.hasMany(BlacklistModel, {
  foreignKey: 'userId',
  as: 'blacklists',
  onDelete: 'CASCADE',
  hooks: true,
})
BlacklistModel.belongsTo(ContentModel, {
  as: 'content',
  foreignKey: 'contentId',
})
ContentModel.hasMany(BlacklistModel, {
  foreignKey: 'contentId',
  as: 'blacklists',
  onDelete: 'CASCADE',
  hooks: true,
})
export default BlacklistModel
