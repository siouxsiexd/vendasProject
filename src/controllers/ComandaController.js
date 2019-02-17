const { Comanda } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const comandas = await Comanda.findAll({
        order: [["createdAt", "ASC"]]
      });

      return res.json(comandas);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async store(req, res) {
    try {
      const comanda = await Comanda.create(req.body);

      return res.json(comanda);
    } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async show(req, res) {
    try {
      const comanda = await Comanda.findById(req.params.id);

      return res.json(comanda);
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
