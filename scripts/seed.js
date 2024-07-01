const postgres = require('postgres');
const { env } = require('process');

require('dotenv').config({
  path: ['.env', '.env.production', '.env.local'],
  override: true,
});

const sql = postgres({
  host: env.POSTGRES_HOST,
  database: env.POSTGRES_DATABASE,
  user: env.POSTGRES_USER,
  password: env.POSTGRES_PASSWORD,
});

sql.file('./scripts/seed.sql').catch((err) => {
  console.error('An error occurred while attempting to seed the database:', err);
});
