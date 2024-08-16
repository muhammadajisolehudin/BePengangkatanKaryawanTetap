import knex from 'knex';
import { Knex } from 'knex';

// Menggunakan require untuk mengimpor konfigurasi
const knexConfig = require('../knexfile');

// Menentukan environment yang akan digunakan
const environment = process.env.NODE_ENV || 'development';
const config: Knex.Config = knexConfig[environment];

// Membuat instance knex
const knexInstance = knex(config);

export default knexInstance;
