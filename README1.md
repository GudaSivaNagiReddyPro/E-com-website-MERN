In `server.js`, these lines are middleware configurations in an Express.js application, used to parse incoming request bodies and make the data available in `req.body`:

```javascript
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
```

I have also added the `public` folder configuration:

```javascript
app.use(express.static("public"));
```

Let's create User or Register APIs.

In the `router` folder, create an `index.js` file:

```javascript
"use strict";

const express = require("express");
const router = express.Router();

// Use the user router for routes starting with /user
router.use("/user", require("./user.router.js"));

module.exports = router;
```

Add this to the `user.router.js` file:

```javascript
"use strict";

const express = require("express");
const { registerUser } = require("../controllers/user.controller");
const router = express.Router();

// Define a route for registering a user
router.post("/register", registerUser);

module.exports = router;
```

In the `controller` folder, create a new file `user.controller.js`:

```javascript
"use strict";

// Define the registerUser controller function
const registerUser = async (req, res) => {
  try {
    console.log("Success Message");
    res.status(200).send("User registered successfully");
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).send("User registration failed");
  }
};

module.exports = { registerUser };
```

Make sure to import and use the router in your `server.js`:

```javascript
"use strict";
require("dotenv").config();
const express = require("express");
const { port } = require("./src/configs/global.config");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Use the router defined in the router folder
app.use("/", require("./src/router"));

app.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.error(`Server Error ${error}`);
  }
});
```

To create a middleware for handling errors that can be used throughout the project, follow these steps:

1. **Create a `response.util.js` file in the `utils` folder:**

```javascript
"use strict";
const i18n = require("i18n");
const { httpsStatusCodes } = require("../constants/http-status-code.constant");
const { httpResponses } = require("../constants/response.constant");

const errorResponse = (
  message,
  error = "",
  statusCode = httpsStatusCodes.ERROR,
  errorType = httpResponses.ERROR
) => {
  return {
    message: i18n.__(message),
    errorType,
    statusCode,
    error: error || i18n.__(message),
  };
};

const successResponse = (
  data,
  message,
  statusCode = httpsStatusCodes.SUCCESS
) => {
  let result = {};
  result = {
    data,
    message: i18n.__(message),
    messageCode: message,
    statusCode,
    status: httpsStatusCodes.SUCCESS,
  };
  if (data) {
    result.data = data;
  }
  return result;
};

module.exports = { errorResponse, successResponse };
```

2. **Add constants in `response.constants.js` and `http-status-code.constants.js`:**

_`http-status-code.constants.js`:_

```javascript
"use strict";
const httpsStatusCodes = Object.freeze({
  SUCCESS: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  UNPROCESSABLE_ENTITY: 422,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
  ERROR: 500,
  ACCESS_DENIED: 403,
  ALREADY_EXISTS: 409,
});
module.exports = { httpsStatusCodes };
```

_`response.constants.js`:_

```javascript
"use strict";
const httpResponses = Object.freeze({
  SUCCESS: "OK",
  BAD_REQUEST: "BAD REQUEST",
  UNAUTHORIZED: "UNAUTHORIZED",
  NOT_FOUND: "NOT FOUND",
  INTERNAL_SERVER_ERROR: "INTERNAL SERVER ERROR",
  ERROR: "ERROR",
  ACCESS_DENIED: "ACCESS DENIED",
  UNPROCESSABLE_ENTITY: "UNPROCESSABLE ENTITY",
  VALIDATION_ERROR: "VALIDATION ERROR",
  ALREADY_EXISTS: "ALREADY EXISTS",
});

module.exports = { httpResponses };
```

3. **Implement i18n in `server.js` file:**

```javascript
"use strict"; // Enable strict mode for improved error checking and code quality

require("dotenv").config();
const express = require("express");
const { port } = require("./src/configs/global.config");
const i18n = require("i18n");
const {
  globalConstant: { local },
} = require("./src/constants/global.constant.js");
const { enTranslations } = require("./locales/en/index.js");
const { hiTranslations } = require("./locales/hi/index.js");
const { setLocalLang } = require("./src/middleware/i18n.middleware.js");

const app = express(); // Create an instance of an Express application

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Internationalization Configuration
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
```

4. **Create `locales` folder and in that `en` and `hi` folders:**

_`en/index.js`:_

```javascript
const { messages } = require("./messages.en.js");
const { validations } = require("./validations.en.js");
const { errors } = require("./errors.en.js");

const enTranslations = { ...messages, ...validations, ...errors };

module.exports = { enTranslations };
```

5. **Create a middleware folder and in `i18n.middleware.js` file:**

```javascript
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
```
