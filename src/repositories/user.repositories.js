"use strict";
const { User } = require("../models/postgres/index");
const findUser = async (input) => {
  try {
    return await User.findOne(input);
  } catch (error) {
    console.log(/error/, error);
    throw new Error(`Error while fetching user in the DB ${error}`);
  }
};

const createUser = async (input) => {
  try {
    return await User.create(input);
  } catch (error) {
    throw new Error(`Error while creating user in the DB ${error}`);
  }
};
module.exports = { findUser, createUser };
