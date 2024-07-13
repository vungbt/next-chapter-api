import sequelize from '@/sequelize'
import { IChapterContentAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'
import ChapterModel from './chapter'
import FileModel from './file'

class ChapterContentModel
  extends Model<IChapterContentAttributes>
  implements IChapterContentAttributes
{
  public id!: string
  public chapterId!: string
  public fileId!: string
}

ChapterContentModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    chapterId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'chapter',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
    fileId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'file',
        key: 'id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL',
    },
  },
  {
    sequelize,
    modelName: 'chapter-content',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

ChapterContentModel.belongsTo(ChapterModel, {
  as: 'chapter',
  foreignKey: 'chapterId',
})
ChapterModel.hasMany(ChapterContentModel, {
  foreignKey: 'chapterId',
  as: 'contents',
  onDelete: 'CASCADE',
  hooks: true,
})
ChapterContentModel.belongsTo(FileModel, {
  as: 'file',
  foreignKey: 'fileId',
})
FileModel.hasOne(ChapterContentModel, {
  foreignKey: 'fileId',
  as: 'ChapterContents',
  onDelete: 'CASCADE',
  hooks: true,
})
export default ChapterContentModel
