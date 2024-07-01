import postgres from 'postgres';
import { env } from 'process';

const sql = postgres({
	host: env.POSTGRES_HOST,
	database: env.POSTGRES_DATABASE,
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
});

export default sql;
