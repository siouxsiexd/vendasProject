module.exports = (sequelize, DataTypes) => {
  const Comanda = sequelize.define("Comanda", {
    number: DataTypes.INTEGER,
    status: DataTypes.STRING
  });
  return Comanda;
};
