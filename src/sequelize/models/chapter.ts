import sequelize from '@/sequelize'
import { IChapterAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class ChapterModel
  extends Model<IChapterAttributes>
  implements IChapterAttributes
{
  public id!: string
  public userId!: string
  public contentId!: string
  public name!: string
}

ChapterModel.init(
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
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    contentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'content',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'chapter',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

ChapterModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
UserModel.hasMany(ChapterModel, {
  foreignKey: 'userId',
  as: 'chapters',
  onDelete: 'CASCADE',
  hooks: true,
})
ChapterModel.belongsTo(ContentModel, {
  as: 'content',
  foreignKey: 'contentId',
})
ContentModel.hasMany(ChapterModel, {
  foreignKey: 'contentId',
  as: 'chapters',
  onDelete: 'CASCADE',
  hooks: true,
})
export default ChapterModel
