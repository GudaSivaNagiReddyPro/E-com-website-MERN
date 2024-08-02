"use strict";
const i18n = require("i18n");
const { httpsStatusCodes } = require("../constants/http-status-code.constant");
const { httpResponses } = require("../constants/response.constant");

const errorResponse = (
  message,
  error = "",
  statusCode = httpsStatusCodes.ERROR,
  errorType = httpResponses.ERROR
) => {
  return {
    message: i18n.__(message),
    errorType,
    statusCode,
    error: error || i18n.__(message),
  };
};

const successResponse = (
  data,
  message,
  statusCode = httpsStatusCodes.SUCCESS
) => {
  let result = {};
  result = {
    data,
    message: i18n.__(message),
    messageCode: message,
    statusCode,
    status: httpsStatusCodes.SUCCESS,
  };
  if (data) {
    result.data = data;
  }
  return result;
};
module.exports = { errorResponse, successResponse };
