"use strict";

const { gender, user_type, status } = require("../src/constants/user.constant");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Primary key",
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        comment: "Unique Identifier",
      },
      first_name: {
        type: Sequelize.STRING(100),
        comment: "First name ",
      },
      last_name: {
        type: Sequelize.STRING(100),
        comment: "Last name",
      },
      email: {
        type: Sequelize.STRING(100),
        comment: "Email",
      },
      gender: {
        type: Sequelize.ENUM(gender.Male, gender.Female, gender.Others),
        defaultValue: gender.Male,
        comment: "1: Male, 2: Female, 3: Other",
      },
      phone_number: {
        type: Sequelize.STRING(15),
        comment: "Phone number",
      },
      password: {
        type: Sequelize.STRING(150),
        comment: "Password (Hashed)",
      },
      user_type: {
        type: Sequelize.ENUM(user_type.Admin, user_type.User),
        defaultValue: user_type.User,
        comment: "Admin: 1  User: 2 ",
      },
      status: {
        type: Sequelize.ENUM(status.Active, status.Inactive),
        defaultValue: status.Active,
        comment: "0: Inactive, 1: Active",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
      deleted_at: {
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
