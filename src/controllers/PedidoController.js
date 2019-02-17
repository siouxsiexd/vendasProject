const { Pedido } = require("../models");
const { Produto_pedido } = require("../models");
const { Comanda } = require("../models");
const Sequelize = require("sequelize");
//const db = require("../models/index");
const sequelize = new Sequelize("ope", "sioux", "1234", {
  dialect: "postgres"
});

module.exports = {
  async index(req, res) {
    try {
      const pedidos = await Produto_pedido.findAll({
        order: [["pedidoId", "ASC"], ["createdAt", "DESC"]]
      });

      return res.json(pedidos);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async store(req, res) {
    try {
      const { number, produtoId } = req.body;
      const statusActive = Comanda.findOne({
        where: {
          number: number,
          status: "ativo".toUpperCase()
        }
      }).then(function(comanda) {
        if (!comanda) {
          return res.json({
            sucess: false,
            message: "This comanda has no avaliable"
          });
        } else {
          const data = {
            numberComanda: req.body.number
          };
          Pedido.create(data).then(async function(newPedido, created) {
            if (!newPedido) {
              res.json({ sucess: false, message: err, statusCode: 500 });
            }
            if (newPedido) {
              const numeroComandaPedido = await Pedido.findOne({
                order: [["createdAt", "desc"]]
              });
              const makePedidos = {
                pedidoId: numeroComandaPedido.id,
                produtoId: produtoId
              };

              Produto_pedido.create(makePedidos).then(function(
                newProduto_pedido,
                created
              ) {
                if (!newProduto_pedido) {
                  res.json({ sucess: false, message: err, statusCode: 500 });
                }
                if (newProduto_pedido) {
                  return res.status(200).json(newProduto_pedido);
                }
              });
            }
          });
        }
      });
    } catch (error) {
      console.log(error);
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async show(req, res) {
    try {
      const pedido = await Pedido.findById(req.params.id);

      return res.json(pedido);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const comanda = await Comanda.findById(id);

      comanda.update(req.body);

      return res.status(200).json(comanda);
    } catch (error) {
      return res.status(400).send({ error: "Update failed" });
    }
  },

  async destroy(req, res) {
    try {
      await Comanda.destroy({
        where: { id: req.params.id }
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Exclusion failed" });
    }
  }
};
