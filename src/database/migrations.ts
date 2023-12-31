import { drizzle } from 'drizzle-orm/node-postgres';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { client } from './connection.ts';
import * as schema from './schema.ts';

try {
  console.log('Initializing database connection');
  const queryClient = drizzle(client, { schema });
  console.log('Applying migrations using Drizzle ORM...');
  await migrate(queryClient, { migrationsFolder: './src/database/migrations' });
  console.log('Migrations applied successfully.');
  await client.end();
} catch (e) {
  console.log(e);
  throw new Error('Could not apply migrations to database.');
}
