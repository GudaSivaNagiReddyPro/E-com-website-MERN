"use strict";

const express = require("express");
const { registerUser } = require("../controllers/user.controller");
const router = express.Router();

router.get("/user-get", registerUser);

module.exports = router;
