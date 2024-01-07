import * as schema from './schema';
import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';

const databaseUrl = `
  postgresql://
  ${process.env.DB_USER}:${process.env.DB_PASSWORD}
  @${process.env.DB_HOST}
  /${process.env.DB_NAME}
  ?sslmode=${process.env.DB_SSL_MODE}
`.replace(/(\r\n|\n|\r)/gm, '').replace(/\s/g, '').trim();

console.log(databaseUrl);

// For migrations
export const migrationClient = postgres(databaseUrl, { max: 1 });

// For query purposes
const queryClient = postgres(databaseUrl);
export const dbClient = drizzle(queryClient);

export default dbClient;
