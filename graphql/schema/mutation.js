import _ from 'lodash';

export const mutationSchema = [
  `
  type Mutation {
    createUser(name: String!, surname: String!, email: String, phone: String): User
    createOrUpdateTransaction(
      id: String,
      name: String!,
      amount: String,
      owners: [String],
      participants: [String]
    ): Transaction
  }
`,
];

export const mutationResolver = {
  Mutation: {
    createUser: (root, { name, surname, email, phone }, context) =>
      context.User.create({ name, surname, email, phone }),

    createOrUpdateTransaction: (
      root,
      { id, name, amount, owners = [], participants = [] },
      context,
    ) =>
      context.Transaction
        .findOrCreate({
          where: { id },
          defaults: {
            name,
            amount,
          },
        })
        .then(([transaction, isCreated]) => {
          const isNotChanged =
            transaction.name === name && transaction.amount === amount;

          if (isNotChanged) return transaction;

          return transaction.update({
            name: name || transaction.name,
            amount: amount || transaction.amount,
          });
        })
        .then(trans => trans.setUsers(null).then(() => trans))
        .then(trans => {
          return Promise.all([
            trans.addUsers(_.difference(owners, participants), {
              through: { isOwner: true },
            }),
            trans.addUsers(_.intersection(owners, participants), {
              through: { isOwner: true, isParticipant: true },
            }),
            trans.addUsers(_.difference(participants, owners), {
              through: { isParticipant: true },
            }),
          ]).then(() => trans);
        }),
  },
};
