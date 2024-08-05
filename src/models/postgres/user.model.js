"use strict";
const { Model } = require("sequelize");
const { user_type, gender, status } = require("../../constants/user.constant");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Primary key",
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        comment: "Unique Identifier",
      },
      first_name: {
        type: DataTypes.STRING(100),
        comment: "First name ",
      },
      last_name: {
        type: DataTypes.STRING(100),
        comment: "Last name",
      },
      email: {
        type: DataTypes.STRING(100),
        comment: "Email",
      },
      gender: {
        type: DataTypes.ENUM(gender.Male, gender.Female, gender.Others),
        defaultValue: gender.Male,
        comment: "1: Male, 2: Female, 3: Other",
      },
      phone_number: {
        type: DataTypes.STRING(15),
        comment: "Phone number",
      },
      password: {
        type: DataTypes.STRING(150),
        comment: "Password (Hashed)",
      },
      user_type: {
        type: DataTypes.ENUM(user_type.Admin, user_type.User),
        defaultValue: user_type.User,
        comment: "Admin: 1  User: 2 ",
      },
      status: {
        type: DataTypes.ENUM(status.Active, status.Inactive),
        defaultValue: status.Active,
        comment: "0: Inactive, 1: Active",
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
      deleted_at: {
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
    },
    {
      sequelize,
      modelName: "User",
      tableName: "users",
      paranoid: true,
      deletedAt: "deleted_at",
      updatedAt: "updated_at",
      createdAt: "created_at",
    }
  );
  return User;
};
