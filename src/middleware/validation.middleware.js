"use strict";

const { httpsStatusCodes } = require("../constants/http-status-code.constant");

const validate = (schema) => {
  return (req, res, next) => {
    const payload = {
      ...req.body,
    };
    const { error } = schema.validate(payload, { abortEarly: false });
    if (!error) {
      logger.info("Schema validated successfully.");
      next();
    } else {
      const { details } = error;
      const message = details.map((x) => x.message).join(",");
      res
        .status(httpsStatusCodes.UNPROCESSABLE_ENTITY)
        .json({ error: message });
    }
  };
};
module.exports = validate;
