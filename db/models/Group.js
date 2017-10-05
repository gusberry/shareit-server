export default (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING,
  });

  Group.associate = models => {
    Group.belongsToMany(models.User, {
      through: models.UserGroup,
    });

    Group.hasMany(models.Transaction);
  };

  return Group;
};
