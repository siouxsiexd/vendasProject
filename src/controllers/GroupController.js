const { Group } = require("../models");

module.exports = {
  async index(req, res) {
    try {
      const groups = await Group.findAll();

      return res.json(groups);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async store(req, res) {
    try {
      const group = await Group.create(req.body);

      return res.json(group);
    } catch (error) {
      return res.status(400).send({ error: "Registration failed" });
    }
  },

  async show(req, res) {
    try {
      const group = await Group.findById(req.params.id);

      return res.json(group);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async update(req, res) {
    try {
      /*
      const group = await Group.update(
        { name: req.body.name },
        {
          where: { id: req.params.id }
        }
      );

      return res.json(group);*/

      const { id } = req.params;
      const group = await Group.findById(id);

      group.update(req.body);

      return res.status(200).json(group);
    } catch (error) {
      return res.status(400).send({ error: "Update failed" });
    }
  },

  async destroy(req, res) {
    try {
      await Group.destroy({
        where: { id: req.params.id }
      });

      return res.send();
    } catch (error) {
      return res.status(400).send({ error: "Exclusion failed" });
    }
  }
};
