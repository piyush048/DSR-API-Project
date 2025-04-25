import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';

class userModel extends Model {
  public id!: number;
  public name!: string;
  public email!: string;
  public password!: string;
  public profilePicture!: string | null;
}

userModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    profilePicture: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'userModel',
    tableName: 'users',
    timestamps: true
  }
);

export default userModel;
