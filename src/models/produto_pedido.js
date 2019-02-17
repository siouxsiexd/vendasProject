module.exports = (sequelize, DataTypes) => {
  const Produto_pedido = sequelize.define("Produto_pedido", {});

  Produto_pedido.associate = models => {
    models.Produto_pedido.belongsTo(models.Pedido, {
      foreignKey: "pedidoId"
    }),
      models.Produto_pedido.belongsTo(models.Product, {
        foreignKey: "produtoId"
      });
  };
  return Produto_pedido;
};
