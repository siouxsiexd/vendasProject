const { Product } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const products = await Product.findAll();

      return res.status(200).json(products);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async store(req, res) {
    try {
      const product = await Product.create(req.body);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async show(req, res) {
    try {
      const product = await Product.findById(req.params.id);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const product = await Product.findById(id);

      product.update(req.body);

      return res.status(200).json(product);
    } catch (error) {
      return res.status(400).send({ error: "Update failed" });
    }
  },

  async destroy(req, res) {
    try {
      await Product.destroy({
        where: { id: req.params.id }
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Exclusion failed" });
    }
  }
};
