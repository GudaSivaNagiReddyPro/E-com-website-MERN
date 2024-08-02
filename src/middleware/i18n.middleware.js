"use strict";
const i18n = require("i18n");
const {
  globalConstant: { local },
} = require("../constants/global.constant");

const setLocalLang = (req, res, next) => {
  const preferredLanguage = req.headers["accept-language"] || local.english;
  if (preferredLanguage) {
    i18n.setLocale(preferredLanguage);
    next();
  }
};
module.exports = { setLocalLang };
