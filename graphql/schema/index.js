import { makeExecutableSchema } from 'graphql-tools';

import { queryResolver, querySchema } from './query';
import { mutationResolver, mutationSchema } from './mutation';

import { transactionResolver, transactionSchema } from './transaction';
import { userResolver, userSchema } from './user';
import { groupResolver, groupSchema } from './group';

const rootSchema = [
  `
  schema {
    query: Query,
    mutation: Mutation
  }
`,
];

export default makeExecutableSchema({
  typeDefs: [
    ...rootSchema,
    ...querySchema,
    ...mutationSchema,
    ...transactionSchema,
    ...userSchema,
    ...groupSchema,
  ],
  resolvers: {
    ...queryResolver,
    ...mutationResolver,
    ...transactionResolver,
    ...userResolver,
    ...groupResolver,
  },
});
