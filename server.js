"use strict"; // Enable strict mode for improved error checking and code quality

// Load environment variables from a .env file into process.env
require("dotenv").config();
// Import the Express library
const express = require("express");
// Import the port configuration from the global config file
const { port } = require("./src/configs/global.config");
const i18n = require("i18n");
const {
  globalConstant: { local },
} = require("./src/constants/global.constant.js");
const { enTranslations } = require("./locales/en/index.js");
const { hiTranslations } = require("./locales/hi/index.js");
const { setLocalLang } = require("./src/middleware/i18n.middleware.js");

const app = express(); // Create an instance of an Express application

// Middleware to parse URL-encoded data (from HTML forms) and make it available in req.body
app.use(express.urlencoded({ extended: true }));

// Middleware to parse JSON data and make it available in req.body
app.use(express.json());

// Middleware to serve static files from the "public" directory
app.use(express.static("public"));

//Internationalization Configuration
i18n.configure({
  locales: [local.english, local.hindi],
  defaultLocale: local.english,
  staticCatalog: {
    en: enTranslations,
    hi: hiTranslations,
  },
  header: "accept-language",
  extension: ".js",
  retryInDefaultLocale: true,
});

app.use(i18n.init);

app.use((req, res, next) => {
  res.__ = setLocalLang;
  next();
});
// Routes
app.use("/api", require("./src/routes/index.js"));

// Start the server and listen on the specified port
app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`); // Log a message when the server is successfully started
  } catch (error) {
    console.log(`Server Error ${error}`); // Log any errors that occur during startup
  }
});
