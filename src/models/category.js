module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    name: DataTypes.STRING
  });

  Category.associate = models => {
    models.Category.belongsTo(models.Group, {
      foreignKey: 'groupId'
    });
  };
  return Category;
};
