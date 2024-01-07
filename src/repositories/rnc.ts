import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import dbClient from '../database/connection.ts';
import type { NewRNC } from '../database/schema.ts';
import * as schema from '../database/schema.ts';
import type { RNC } from '../database/schema.ts';
import { rnc } from '../database/schema.ts';
import { PostgresJsDatabase } from 'drizzle-orm/postgres-js';

class RNCRepository {
  dbClient: PostgresJsDatabase<Record<string, never>>;

  constructor() {
    this.dbClient = dbClient;
  }

  async findAll() {
    const rncCollection = await this.dbClient.select().from(rnc);
    return rncCollection.map((rnc) => {
      return {
        id: rnc.id,
        name: rnc.name,
        commercialName: rnc.commercialName,
        description: rnc.description,
        address: rnc.address,
        phone: rnc.phone,
        creationDate: rnc.creationDate,
        status: rnc.status,
        paymentSystem: rnc.paymentSystem,
      };
    });
  }

  async getById(id: string) {
    const record = await this.dbClient.select().from(rnc).where(eq(rnc.id, id)).limit(1);

    if (record[0]?.id) {
      return record;
    } else {
      return { message: `RNC ${id} could not be found in the database.` };
    }
  }

  async add(record: NewRNC) {
    return await this.dbClient.insert(rnc).values(record).returning();
  }
}

export default new RNCRepository();
