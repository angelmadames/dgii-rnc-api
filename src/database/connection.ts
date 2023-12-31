import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './schema';

export const db = new Client({
  host: process.env.DB_HOST,
  port: 5432,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

try {
  console.log('Connecting to database...');
  await db.connect();
  console.log('Connected!');
} catch (e) {
  throw new Error(`Could not connect to database. See logs for details: ${e}`);
}

export const client = db;
export const queryClient = drizzle(db, { schema });

export default queryClient;
