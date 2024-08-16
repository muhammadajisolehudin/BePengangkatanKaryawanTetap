// "use strict";

// import fs from "fs";
// import path from "path";
// import { Model } from "objection";
// import Knex from "knex";
// import { ModelClass } from "objection";
// import { DbModel } from "./types"; // Sesuaikan dengan tipe data model Anda jika diperlukan

// const basename: string = path.basename(__filename);
// const env: string = process.env.NODE_ENV || "development";
// const config: any = require(__dirname + "../../config/db")[env];
// const db: { [key: string]: ModelClass<Model> } = {};

// // Import konfigurasi Knex yang terpisah
// import knexInstance from "../../config/db";

// // Gunakan instance Knex yang sudah didefinisikan
// const knex: Knex = knexInstance;

// fs.readdirSync(__dirname)
//   .filter((file: string) => {
//     return (
//       file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
//     );
//   })
//   .forEach((file: string) => {
//     const model: ModelClass<Model> = require(path.join(__dirname, file)).default;
//     db[model.name] = model;
//   });

// Object.values(db).forEach((model: ModelClass<Model>) => {
//   if (model.associate) {
//     model.associate(db as DbModel); // Sesuaikan dengan tipe data model Anda jika diperlukan
//   }
// });

// Model.knex(knex);

// export default db;
