export const groupSchema = [
  `
  type Group {
    id: ID
    name: String
    transactions: [Transaction]
  }
`,
];

export const groupResolver = {
  Group: {
    id: (groupFromDB, _, context) => groupFromDB.id,
    name: (groupFromDB, _, context) => groupFromDB.name,
    transactions: (groupFromDB, _, context) => groupFromDB.getTransactions(),
  },
};
