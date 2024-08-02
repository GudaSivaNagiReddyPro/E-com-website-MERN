"use strict";

const { httpsStatusCodes } = require("../constants/http-status-code.constant");
const { httpResponses } = require("../constants/response.constant");
const { successResponse, errorResponse } = require("../utils/response.util");

const registerUser = async (req, res) => {
  try {
    const data = {
      username: "Siva",
    };
    return res.json(
      successResponse(
        data,
        "SUCCESSFULLY_REGISTERED",
        httpResponses.SUCCESS,
        httpsStatusCodes.SUCCESS
      )
    );
  } catch (error) {
    return errorResponse(
      "SOME_THING_WENT_WRONG_WHILE_REGISTER",
      httpsStatusCodes.INTERNAL_SERVER_ERROR,
      httpResponses.INTERNAL_SERVER_ERROR
    );
  }
};

module.exports = { registerUser };
