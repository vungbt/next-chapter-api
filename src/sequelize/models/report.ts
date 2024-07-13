import sequelize from '@/sequelize'
import { EReportType, IReportAttributes } from '@/types'
import { DataTypes, Model } from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import UserModel from './user'
import ContentModel from './content'

class ReportModel
  extends Model<IReportAttributes>
  implements IReportAttributes
{
  public id!: string
  public userId!: string
  public contentId!: string
  public type?: EReportType
  public content!: string
}

ReportModel.init(
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
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    type: {
      type: DataTypes.ENUM(EReportType.Normal, EReportType.Saying),
      allowNull: true,
      defaultValue: EReportType.Normal,
    },
  },
  {
    sequelize,
    modelName: 'report',
    freezeTableName: true,
    timestamps: true,
    createdAt: true,
    updatedAt: true,
    deletedAt: true,
  },
)

ReportModel.belongsTo(UserModel, { as: 'user', foreignKey: 'userId' })
UserModel.hasMany(ReportModel, {
  foreignKey: 'userId',
  as: 'reports',
  onDelete: 'CASCADE',
  hooks: true,
})
ReportModel.belongsTo(ContentModel, {
  as: 'content',
  foreignKey: 'contentId',
})
ContentModel.hasMany(ReportModel, {
  foreignKey: 'contentId',
  as: 'reports',
  onDelete: 'CASCADE',
  hooks: true,
})
export default ReportModel
