import { eq } from 'drizzle-orm';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import queryClient from '../database/connection.ts';
import type { RNC } from '../database/schema.ts';
import * as schema from '../database/schema.ts';
import { rnc } from '../database/schema.ts';

class RNCRepository {
  databaseClient: NodePgDatabase<typeof schema>;

  constructor(client = queryClient) {
    this.databaseClient = client;
  }

  async findAll() {
    const rncCollection = await this.databaseClient.query.rnc.findMany();
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
    const record = await this.databaseClient.query.rnc.findFirst({
      where: eq(rnc.id, id),
    });

    if (record?.id) {
      return record;
    } else {
      return { message: `RNC ${id} could not be found in the database.` };
    }
  }

  async add(record: RNC) {
    await this.databaseClient
      .insert(rnc)
      .values({
        id: record.id,
        name: record.name,
        commercialName: record.commercialName,
        description: record.description,
        address: record.address,
        phone: record.phone,
        creationDate: record.creationDate,
        status: record.status,
        paymentSystem: record.paymentSystem,
      })
      .onConflictDoNothing()
      .returning();
  }
}

export default new RNCRepository();
