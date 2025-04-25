import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

export interface IDSRAttributes {
  id?: number;
  userId: number;
  project: string;
  content: string;
  date: Date; 
  hours: number;
  createdAt?: Date;
  updatedAt?: Date;
}

class DSR extends Model<IDSRAttributes> implements IDSRAttributes {
  public id!: number;
  public userId!: number;
  public project!: string;
  public content!: string;
  public date!: Date; 
  public hours!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

DSR.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    project: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'DSR System',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    hours: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'DSR',
    tableName: 'dsrs',
    timestamps: true,
  }
);

export default DSR;
