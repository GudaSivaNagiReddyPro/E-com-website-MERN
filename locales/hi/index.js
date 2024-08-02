const { messages } = require("./messages.hi.js");
const { validations } = require("./validations.hi.js");
const { errors } = require("./errors.hi.js");

const hiTranslations = { ...messages, ...validations, ...errors };

module.exports = { hiTranslations };
