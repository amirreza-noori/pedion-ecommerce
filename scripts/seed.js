const pg = require('pg');
const fs = require('fs');
const { resolve } = require('path');
const { env } = require('process');

const envFiles = ['.env', '.env.production', '.env.local'];

require('dotenv').config({
	path: envFiles.map((file) => resolve(process.cwd(), file)),
	override: true,
});

const client = new pg.Client({
	host: env.POSTGRES_HOST,
	database: env.POSTGRES_DATABASE,
	user: env.POSTGRES_USER,
	password: env.POSTGRES_PASSWORD,
});

async function main() {
	client.connect();

	const sql = await fs.readFileSync(
		resolve(process.cwd(), 'scripts/seed.sql'),
		{ encoding: 'utf-8' }
	);

	await client.query(sql);

	await client.end();
}

main().catch((err) => {
	console.error(
		'An error occurred while attempting to seed the database:',
		err
	);
});
