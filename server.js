"use strict";
require("dotenv").config();
const express = require("express");
const { port } = require("./src/configs/global.config");
const app = express();

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log(`Server Error ${error}`);
  }
});
