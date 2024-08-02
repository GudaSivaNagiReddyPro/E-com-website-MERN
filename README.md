# E-com-website-MERN

Initialize the project with the command:

```bash
npm init -y
```

Install the required packages such as express, dotenv, etc. Make sure to include all necessary dependencies for your project.

Since I am using Git, a .gitignore file is useful to ignore commits of specific changes. Here is the .gitignore file:

```plaintext
# Node modules
node_modules/

# Environment variables
.env
```

Create an .env file for security purposes and access the environment variables in your code. Use "use strict" to ensure that JavaScript code is executed in "strict mode".

Create `server.js`, the main file, and set up the server:

```javascript
"use strict";
const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```

## Folder Structure

```plaintext
bin
migration
resources
seeders
src
  ├── configs
  ├── constants
  ├── controllers
  ├── repositories
  ├── models
  │   └── postgres
  ├── routes
  ├── utils
  └── validations
.env.sample
.sequelizerc
server.js
```

Install nodemon to automatically restart the server when you save changes:

```bash
npm install --save-dev nodemon
```

Add `require("dotenv").config();` in `server.js` and create `configs/global.config.js` to call environment variables.

Run the server with:

```bash
npm start
```

The output should be:

```plaintext
Server is running on port <port>
```

## Database Connection

I am using PostgreSQL with Sequelize ORM. Follow these steps:

Install Sequelize and PostgreSQL packages:

```bash
npm install --save sequelize
npm install --save pg pg-hstore
npm install --save-dev sequelize-cli
npx sequelize-cli init
```

This will create:

- `config` - contains the config file, which tells CLI how to connect with the database
- `models` - contains all models for your project
- `migrations` - contains all migration files
- `seeders` - contains all seed files

Configure the `.sequelizerc` file to link with migrations and models:

```javascript
"use strict";
const path = require("path");

module.exports = {
  config: path.resolve("src/configs", "db.config.js"),
  "model.path": path.resolve("src/models", "postgres"),
};
```

Update the `config/db.config.js` file with the following content:

```json
{
  "development": {
    "username": "root",
    "password": null,
    "database": "database_development",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "test": {
    "username": "root",
    "password": null,
    "database": "database_test",
    "host": "127.0.0.1",
    "dialect": "mysql"
  },
  "production": {
    "username": "root",
    "password": null,
    "database": "database_production",
    "host": "127.0.0.1",
    "dialect": "mysql"
  }
}
```

Update the environment file (`.env`) with your database credentials:

```dotenv
PGHOST=
PGPORT=5432
PGDATABASE=
PGUSER=
PGPASSWORD=
DIALECT=postgres

PG_MAX_POOL_SIZE=10
PG_MIN_POOL_SIZE=1
PG_POOL_ACQUIRE=30000
PG_POOL_IDLE=10000
```

Update the path in `models/index.js`:

```javascript
"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../configs/db.config.js")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
```

Set up the `.sequelizerc` file:

```javascript
"use strict";
const path = require("path");

module.exports = {
  config: path.resolve("src/configs", "db.config.js"),
  "model.path": path.resolve("src/models", "postgres"),
};
```

Let's create a table (migration and model):

Generate the User model and migration:

```bash
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string
```

Add user constants in `src/constants/user.constant.js`:

```javascript
"use strict";

module.exports = {
  gender: {
    Male: "1",
    Female: "2",
    Others: "3",
  },
  user_type: {
    Admin: "0",
    User: "1",
  },
  status: {
    Active: "1",
    Inactive: "0",
  },
};
```

create model and migration

```javascript
"use strict";

const { gender, user_type, status } = require("../src/constants/user.constant");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Primary key",
      },
      uuid: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        unique: true,
        comment: "Unique Identifier",
      },
      first_name: {
        type: Sequelize.STRING(100),
        comment: "First name ",
      },
      last_name: {
        type: Sequelize.STRING(100),
        comment: "Last name",
      },
      email: {
        type: Sequelize.STRING(100),
        comment: "Email",
      },
      gender: {
        type: Sequelize.ENUM(gender.Male, gender.Female, gender.Others),
        defaultValue: gender.Male,
        comment: "1: Male, 2: Female, 3: Other",
      },
      phone_number: {
        type: Sequelize.STRING(15),
        comment: "Phone number",
      },
      password: {
        type: Sequelize.STRING(150),
        comment: "Password (Hashed)",
      },
      user_type: {
        type: Sequelize.ENUM(user_type.Admin, user_type.User),
        defaultValue: user_type.User,
        comment: "Admin: 1  User: 2 ",
      },
      status: {
        type: Sequelize.ENUM(status.Active, status.Inactive),
        defaultValue: status.Active,
        comment: "0: Inactive, 1: Active",
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
      deleted_at: {
        type: Sequelize.DATE,
        comment: "Default timezone UTC",
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("users");
  },
};
```

```javascript
"use strict";
const { Model } = require("sequelize");
const { user_type, gender, status } = require("../../constants/user.constant");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        comment: "Primary key",
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        unique: true,
        comment: "Unique Identifier",
      },
      first_name: {
        type: DataTypes.STRING(100),
        comment: "First name ",
      },
      last_name: {
        type: DataTypes.STRING(100),
        comment: "Last name",
      },
      email: {
        type: DataTypes.STRING(100),
        comment: "Email",
      },
      gender: {
        type: DataTypes.ENUM(gender.Male, gender.Female, gender.Others),
        defaultValue: gender.Male,
        comment: "1: Male, 2: Female, 3: Other",
      },
      phone_number: {
        type: DataTypes.STRING(15),
        comment: "Phone number",
      },
      password: {
        type: DataTypes.STRING(150),
        comment: "Password (Hashed)",
      },
      user_type: {
        type: DataTypes.ENUM(user_type.Admin, user_type.User),
        defaultValue: user_type.User,
        comment: "Admin: 1  User: 2 ",
      },
      status: {
        type: DataTypes.ENUM(status.Active, status.Inactive),
        defaultValue: status.Active,
        comment: "0: Inactive, 1: Active",
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
      deleted_at: {
        type: DataTypes.DATE,
        comment: "Default timezone UTC",
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
```

Run the command `npx sequelize-cli db:migrate`. This will create the user tables in your database.

Response:

```
Sequelize CLI [Node: 18.17.1, CLI: 6.6.2, ORM: 6.37.3]

Loaded configuration file "src/configs/db.config.js".
Using environment "local".
== 20240801135059-create-user: migrating =======
== 20240801135059-create-user: migrated (0.061s)
```
