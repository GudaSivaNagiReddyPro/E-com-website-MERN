"use strict";
require("dotenv").config();
/*
|--------------------------------------------------------------------------
| DATABASE
|--------------------------------------------------------------------------
*/
const dbHostConfig = {
  host: process.env.PGHOST,
  port: process.env.PGPORT || 5432,
  database: process.env.PGDATABASE,
  username: process.env.PGUSER,
  password: process.env.PGPASSWORD,
  dialect: process.env.DIALECT,
  dialectOptions: {
    bigNumberStrings: true,
  },
};
const dbConfig = {
  local: dbHostConfig,
  development: dbHostConfig,
  dev: dbHostConfig,
  production: dbHostConfig,
};
module.exports = dbConfig;
