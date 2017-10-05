export const querySchema = [
  `
  type Query {
    me: User
    user(id: String!): User
    group(id: String!): Group
    transactions: [Transaction]
    transaction(id: String!): Transaction
    users: [User]
  }
`,
];

export const queryResolver = {
  Query: {
    me: (root, {}, context) => context.User.findById(1),
    user: (root, { id }, context) => context.User.findById(id),
    transaction: (root, { id }, context) => context.Transaction.findById(id),
    transactions: (root, {}, context) => context.Transaction.findAll(),
    users: (root, {}, context) => context.User.findAll(),
    group: (root, { id }, context) => context.Group.findById(id),
  },
};
