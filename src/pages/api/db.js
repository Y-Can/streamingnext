import { Pool } from "pg";
const pool = new Pool({
  user: "streamingzone_user",
  host: "dpg-clkbvs6g1b2c73e8ner0-a.frankfurt-postgres.render.com",
  database: "streamingzone",
  password: "3t8PwdHxgzPGXFmhxIlrfokTJkPuNmyO",
  port: 5432,
  ssl: { rejectUnauthorized: true },
});
export default pool;
