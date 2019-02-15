module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define("Product", {
    name: DataTypes.STRING,
    unitaryValue: DataTypes.DECIMAL,
    manipulated: DataTypes.BOOLEAN,
  });

  Product.associate = models => {
    models.Product.belongsTo(models.Category, {
      foreignKey: 'categoryId'
    });
  };
  return Product;
};
