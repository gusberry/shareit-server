import express from 'express';
import cors from 'cors';
import { graphqlServer } from './graphql';

const app = express();
app.use('*', cors());
app.use(
  '/graphql',
  graphqlServer(
    {
      /*fake user*/
    },
  ),
);

export default app;
