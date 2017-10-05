export const transactionSchema = [
  `
  type Transaction {
    id: ID
    name: String
    amount: String
    owners: [User]
    participants: [User]
  }
`,
];

export const transactionResolver = {
  Transaction: {
    id: (trFromDB, _, context) => trFromDB.id,
    name: (trFromDB, _, context) => trFromDB.name,
    amount: (trFromDB, _, context) => trFromDB.amount,
    owners: (trFromDB, _, context) => trFromDB.getOwners(),
    participants: (trFromDB, _, context) => trFromDB.getParticipants(),
  },
};
