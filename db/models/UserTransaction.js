export default (sequelize, DataTypes) => {
  const UserTransaction = sequelize.define(
    'UserTransaction',
    {
      isOwner: DataTypes.BOOLEAN,
      isParticipant: DataTypes.BOOLEAN,
    },
    {
      scopes: {
        onlyOwners: {
          where: {
            isOwner: true,
          },
        },
        onlyParticipants: {
          where: {
            isParticipant: true,
          },
        },
      },
    },
  );

  return UserTransaction;
};
