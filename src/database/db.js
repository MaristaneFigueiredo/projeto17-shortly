import pg from "pg";

const { Pool } = pg;

export const connectionDB = new Pool({
  connectionString: process.env.DATABASE_URL,
  //ssl: true,
});
