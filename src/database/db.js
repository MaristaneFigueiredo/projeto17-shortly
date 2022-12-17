import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const { Pool } = pg;

//banco render
const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
  //ssl: false,
});

//banco local
// const connectionDB = new Pool({
//   host: "localhost",
//   port: 5432,
//   user: "postgres",
//   password: "Banco2404@",
//   database: "shortly",
// });

//banco local
// const connectionDB = new Pool({
//   host: process.env.HOST,
//   port: process.env.PORTDB,
//   user: process.env.USERDB,
//   password: process.env.PASSWORD,
//   database: process.env.DATABASE,
// });

export default connectionDB;
