import { Elysia } from 'elysia';
import RNCRepository from '../repositories/rnc.ts';

export const rncController = (api: Elysia) => {
  api.get('/rnc', () => {
    return {
      message: 'This is the root path for the RNC controller endpoints.',
    };
  });
  api.get('/rnc/:id', async ({ params: { id } }) => {
    try {
      return RNCRepository.getById(id);
    } catch (e) {
      console.log(e);
    }
  });
  api.get('rnc/all', async () => {
    try {
      return RNCRepository.findAll();
    } catch (e) {
      console.log(e);
    }
  });

  return api;
};

export default rncController;
