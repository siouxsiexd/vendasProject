const { Category } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const categories = await Category.findAll();

      return res.status(200).json(categories);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async store(req, res) {
    try {
      const category = await Category.create(req.body);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async show(req, res) {
    try {
      const category = await Category.findById(req.params.id);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params;
      const category = await Category.findById(id);

      category.update(req.body);

      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).send({ error: "Update failed" });
    }
  },

  async destroy(req, res) {
    try {
      await Category.destroy({
        where: { id: req.params.id }
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Exclusion failed" });
    }
  }
};
