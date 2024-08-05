"use strict";

const { httpsStatusCodes } = require("../constants/http-status-code.constant");
const { httpResponses } = require("../constants/response.constant");
const { findUser, createUser } = require("../repositories/user.repositories");
const { successResponse, errorResponse } = require("../utils/response.util");

const registerUser = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, phone_number, password } =
      req.body;
    const userExists = await findUser({ where: { email } });
    if (userExists) {
      return res.json(
        errorResponse(
          "USER_ALREADY_EXITS",
          httpsStatusCodes.INTERNAL_SERVER_ERROR,
          httpResponses.INTERNAL_SERVER_ERROR
        )
      );
    }
    const userData = {
      first_name,
      last_name,
      email,
      gender,
      phone_number,
    };
    await createUser({ ...userData });
    return res.json(
      successResponse(
        "SUCCESSFULLY_REGISTERED",
        httpResponses.SUCCESS,
        httpsStatusCodes.SUCCESS
      )
    );
  } catch (error) {
    console.log(/error/, error);
    return errorResponse(
      "SOME_THING_WENT_WRONG_WHILE_REGISTER",
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponses.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { registerUser };
