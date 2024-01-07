import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { migrationClient } from './connection.ts';

try {
  console.log('Applying migrations using Drizzle ORM...');
  await migrate(drizzle(migrationClient), {
    migrationsFolder: './src/database/migrations',
  });
  console.log('Migrations applied successfully.');
  migrationClient.end();
} catch (e) {
  console.log(e);
  throw new Error('Could not apply migrations to database.');
}
