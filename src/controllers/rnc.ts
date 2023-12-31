import { eq } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { queryClient as client } from '../database/connection.ts';
import { rnc } from '../database/schema.ts';

export const rncController = (api: Elysia) => {
  api.get('/rnc', () => {
    return {
      message: 'This is the root path for the RNC controller endpoints.',
    };
  });
  api.get('/rnc/:id', async ({ params: { id } }) => {
    try {
      const result = await client.query.rnc.findFirst({
        where: eq(rnc.id, id),
      });
      return result;
    } catch (e) {
      console.log(e);
    }
  });

  return api;
};

export default rncController;
