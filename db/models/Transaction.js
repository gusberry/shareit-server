export default (sequelize, DataTypes) => {
  const Transaction = sequelize.define('Transaction', {
    name: DataTypes.STRING,
    amount: DataTypes.STRING,
  });

  Transaction.associate = models => {
    Transaction.belongsTo(models.Group);

    Transaction.belongsToMany(models.User, {
      through: models.UserTransaction,
    });
    Transaction.belongsToMany(models.User, {
      through: models.UserTransaction.scope('onlyOwners'),
      as: 'owners',
      constraints: false,
    });
    Transaction.belongsToMany(models.User, {
      through: models.UserTransaction.scope('onlyParticipants'),
      as: 'participants',
      constraints: false,
    });
  };

  return Transaction;
};
