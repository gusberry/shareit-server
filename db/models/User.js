export default (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
  });

  User.associate = models => {
    User.belongsToMany(models.Transaction, {
      through: models.UserTransaction,
    });

    User.belongsToMany(models.Group, {
      through: models.UserGroup,
    });

    User.belongsToMany(models.Transaction, {
      through: models.UserTransaction.scope('onlyOwners'),
      as: 'owned',
      constraints: false,
    });
  };

  return User;
};
