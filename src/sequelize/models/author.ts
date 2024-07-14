import sequelize from '@/sequelize'
import { IAuthorAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import FileModel from './file'

class AuthorModel
  extends Model<IAuthorAttributes>
  implements IAuthorAttributes
{
  public id!: string
  public fullName!: string
  public avatarId?: string
  public thumbnailId?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

AuthorModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    avatarId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
    thumbnailId: {
      type: DataTypes.UUID,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'author',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

AuthorModel.belongsTo(FileModel, {
  foreignKey: 'avatarId',
  as: 'avatar',
})

AuthorModel.belongsTo(FileModel, {
  foreignKey: 'thumbnailId',
  as: 'thumbnail',
})

export default AuthorModel
