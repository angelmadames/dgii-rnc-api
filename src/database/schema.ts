import { date, pgTable, text, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const rnc = pgTable(
  'rnc',
  {
    id: varchar('id').primaryKey(),
    name: varchar('name', { length: 256 }),
    commercialName: varchar('commercialName', { length: 256 }),
    description: text('description'),
    address: varchar('address'),
    phone: varchar('phone', { length: 11 }),
    creationDate: date('creationDate', { mode: 'string' }),
    status: varchar('status'),
    paymentSystem: varchar('paymentSystem'),
  },
  (rnc) => {
    return {
      nameIndex: uniqueIndex('rnc_idx').on(rnc.id),
    };
  },
);

export type RNC = typeof rnc.$inferSelect;
export type NewRNC = typeof rnc.$inferInsert;
