export const userSchema = [
  `
  type User {
    id: ID
    name: String
    surname: String
    email: String
    groups: [Group]
    transactions: [Transaction]
  }
`,
];

export const userResolver = {
  User: {
    id: (userFromDB, _, context) => userFromDB.id,
    name: (userFromDB, _, context) => userFromDB.name,
    surname: (userFromDB, _, context) => userFromDB.surname,
    email: (userFromDB, _, context) => userFromDB.email,
    groups: (userFromDB, _, context) => userFromDB.getGroups(),
    transactions: (userFromDB, _, context) => userFromDB.getTransactions(),
  },
};
