import type { Knex } from "knex";
import dotenv from "dotenv"

// Update with your config settings.
dotenv.config();

const PORT=Number(process.env.DB_PORT)

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "pg",
    connection: {
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      port: PORT,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
    },

    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};

module.exports = config;
