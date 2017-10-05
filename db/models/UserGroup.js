export default (sequelize, DataTypes) => {
  const UserGroup = sequelize.define('UserGroup');

  return UserGroup;
};
