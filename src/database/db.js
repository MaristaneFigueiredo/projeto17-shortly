import pg from "pg";

const { Pool } = pg;

const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});




export default connectionDB