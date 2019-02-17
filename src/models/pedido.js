module.exports = (sequelize, DataTypes) => {
  const Pedido = sequelize.define("Pedido", {
    numberComanda: DataTypes.STRING
  });

  
  return Pedido;
};
