import graphqlHTTP from 'express-graphql';
import db from '../db';
import schema from './schema';

export const graphqlServer = user => {
  return graphqlHTTP({
    schema,
    graphiql: true,
    context: {
      User: db.User,
      Transaction: db.Transaction,
      Group: db.Group,
    },
  });
};
