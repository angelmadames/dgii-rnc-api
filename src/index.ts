#!/usr/bin/env bun
import { Elysia as Server } from 'elysia';
import { rncController } from './controllers/rnc.ts';

const api = new Server();

api.get('/', () => ({
  message: 'Welcome to the DGII RNC community-driven API.',
  status: 'UP',
}));

api.use(rncController);

api.listen(parseInt(process.env.PORT!) || 3000, () => {
  console.log(
    `🦊 API server running at ${api.server?.hostname}:${api.server?.port}`,
  );
});
