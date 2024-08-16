import Knex from 'knex';
import { Model } from 'objection';
const PORT=Number(process.env.DB_PORT)
const knexInstance = Knex({
  client: 'pg',
 connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: PORT,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
  },
});

Model.knex(knexInstance);

export default knexInstance;
