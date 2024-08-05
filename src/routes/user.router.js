"use strict";

const express = require("express");
const { registerUser } = require("../controllers/user.controller");
const { validateInput } = require("../utils/validate.util");
const { registerUserSchema } = require("../validations/user.validation");
const router = express.Router();

router.post("/user-create", validateInput(registerUserSchema), registerUser);

module.exports = router;
