const joi = require("joi");

const { gender } = require("../constants/user.constant");
const registerUserSchema = joi.object({
  first_name: joi.string().min(1).max(100).required().messages({
    "string.base": "FIRST_NAME_MUST_BE_A_STRING",
    "string.empty": "FIRST_NAME_REQUIRED",
    "string.min": "FIRST_NAME_MIN_LENGTH",
    "string.max": "FIRST_NAME_MAX_LENGTH",
    "any.required": "FIRST_NAME_REQUIRED",
  }),
  last_name: joi.string().min(1).max(100).required().messages({
    "string.base": "LAST_NAME_MUST_BE_A_STRING",
    "string.empty": "LAST_NAME_REQUIRED",
    "string.min": "LAST_NAME_MIN_LENGTH",
    "string.max": "LAST_NAME_MAX_LENGTH",
    "any.required": "LAST_NAME_REQUIRED",
  }),
  email: joi.string().email().required().messages({
    "string.base": "EMAIL_MUST_BE_A_STRING",
    "string.empty": "EMAIL_REQUIRED",
    "string.email": "EMAIL_MUST_BE_VALID",
    "any.required": "EMAIL_REQUIRED",
  }),
  gender: joi
    .string()
    .valid(gender.Male, gender.Female, gender.Others)
    .required()
    .messages({
      "string.base": "GENDER_MUST_BE_A_STRING",
      "any.only": "GENDER_MUST_BE_VALID",
      "any.required": "GENDER_REQUIRED",
    }),
  password: joi
    .string()
    .min(8)
    .max(20)
    .pattern(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/
    )
    .required()
    .messages({
      "string.base": "PASSWORD_REQUIRED",
      "string.empty": "PASSWORD_SHOULD_BE_MORE_THAN_EIGHT_LETTERS",
      "any.required": "PASSWORD_REQUIRED",
      "string.pattern.base": "PASSWORD_REGEX",
    }),
  phone_number: joi.string().min(10).max(15).required().messages({
    "string.base": "PHONE_NUMBER_MUST_BE_A_STRING",
    "string.empty": "PHONE_NUMBER_REQUIRED",
    "string.min": "PHONE_NUMBER_MIN_LENGTH",
    "string.max": "PHONE_NUMBER_MAX_LENGTH",
    "any.required": "PHONE_NUMBER_REQUIRED",
  }),
});

module.exports = {
  registerUserSchema,
};
