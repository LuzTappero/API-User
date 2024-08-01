import { Sequelize, UUIDV4, DataTypes, Model } from "sequelize";
import sequelize from "../config/sqlconfig.js";
import bcrypt from "bcrypt";

class UserModel extends Sequelize.Model {
  static async authenticate(username, password){
    try {
      const user = await this.findOne({ where: { username } });
      if (!user) {
        throw new Error("User not found");
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        throw new Error("Incorrect password");
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}

UserModel.init(
  {
    user_id: {
      type: DataTypes.STRING,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: sequelize.NOW,
    },
  },
  {
    sequelize,
    modelName: "UserModel",
    tableName: "users",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

export default UserModel;
