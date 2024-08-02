const { messages } = require("./messages.en.js");
const { validations } = require("./validations.en.js");
const { errors } = require("./errors.en.js");

const enTranslations = { ...messages, ...validations, ...errors };

module.exports = { enTranslations };
