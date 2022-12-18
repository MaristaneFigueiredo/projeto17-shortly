import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

//banco render
const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

//banco local
// const connectionDB = new Pool({
//   host: process.env.HOST,
//   port: process.env.PORTDB,
//   user: process.env.USERDB,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

export default connectionDB;
