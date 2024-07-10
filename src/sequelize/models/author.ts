import sequelize from '@/sequelize'
import { IAuthorAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'

class AuthorModel
  extends Model<IAuthorAttributes>
  implements IAuthorAttributes
{
  public id!: string
  public fullName!: string
  public avatarUrl?: string
  public thumbnail?: string
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
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    thumbnail: {
      type: DataTypes.STRING,
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

export default AuthorModel
