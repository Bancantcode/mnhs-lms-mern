import pg from 'pg';
import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

// const db = new pg.Pool({
//     user: process.env.DB_USER || "postgres",
//     host: process.env.DB_HOST || "localhost",
//     database: process.env.DB_NAME || "MNHS-DB",
//     password: process.env.DB_PASS || "admin",
//     port: process.env.DB_PORT || 5432
// });

// const sequelize = new Sequelize("MNHS-DB", "postgres", "admin", { // change to process.env
//   host: 'localhost',
//   dialect: 'postgres',
// });

// const sequelize = new Sequelize({
//   dialect: 'postgres',
//   database: process.env.DB_NAME,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   host: process.env.DB_HOST,
//   port: process.env.DB_PORT,
//   ssl: true,
//   clientMinMessages: 'notice',
// });

const sequelize = new Sequelize(process.env.DB_HOST);

// db.connect();

// export { db, sequelize };
export { sequelize };