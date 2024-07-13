import sequelize from '@/sequelize'
import { IRateAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class RateModel extends Model<IRateAttributes> implements IRateAttributes {
  public id!: string
  public userId!: string
  public contentId!: string
  public rate!: number
}

RateModel.init(
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
    rate: {
      type: DataTypes.FLOAT,
      allowNull: false,
      defaultValue: 0,
      validate: {
        isIn: [[0, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]],
      },
    },
  },
  {
    sequelize,
    modelName: 'rate',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

RateModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
UserModel.hasMany(RateModel, {
  foreignKey: 'userId',
  as: 'rates',
  onDelete: 'CASCADE',
  hooks: true,
})
RateModel.belongsTo(ContentModel, {
  as: 'content',
  foreignKey: 'contentId',
})
ContentModel.hasMany(RateModel, {
  foreignKey: 'contentId',
  as: 'rates',
  onDelete: 'CASCADE',
  hooks: true,
})
export default RateModel
