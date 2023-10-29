const path = require("path");
require("dotenv").config();
const {DATABASE_URL} = process.env;

module.exports = {
  development: {
    client: "postgresql",
    connection: "postgres://wpkabeou:B7ngkPMECqBNN9NXZ8sHbJD-9MINr5_w@suleiman.db.elephantsql.com/wpkabeou",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  production: {
    client: "postgresql",
    connection: "postgres://wpkabeou:B7ngkPMECqBNN9NXZ8sHbJD-9MINr5_w@suleiman.db.elephantsql.com/wpkabeou",
    pool: { min: 0, max: 5 },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
  },

  test: {
    client: "sqlite3",
    connection: {
      filename: ":memory:",
    },
    migrations: {
      directory: path.join(__dirname, "src", "db", "migrations"),
    },
    seeds: {
      directory: path.join(__dirname, "src", "db", "seeds"),
    },
    useNullAsDefault: true,
  },
};
