"use strict";

const express = require("express");
const router = express.Router();

router.use("/user", require("./user.router.js"));

module.exports = router;
