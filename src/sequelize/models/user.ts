import sequelize from '@/sequelize'
import { EUserRole, IUserAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import FileModel from './file'

class UserModel extends Model<IUserAttributes> implements IUserAttributes {
  public id!: string
  public username!: string
  public password!: string
  public role!: EUserRole
  public avatarId?: string
  public createdAt?: Date
  public updatedAt?: Date
  public deletedAt?: Date
}

UserModel.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: FileModel,
        key: 'id',
      },
    },
    role: {
      type: DataTypes.ENUM(EUserRole.Admin, EUserRole.Customer),
      defaultValue: EUserRole.Customer,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'user',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

UserModel.belongsTo(FileModel, {
  foreignKey: 'avatarId',
  as: 'avatar',
})
UserModel.prototype.toJSON = function () {
  const values: any = Object.assign({}, this.get())
  delete values.password
  return values
}

export default UserModel
