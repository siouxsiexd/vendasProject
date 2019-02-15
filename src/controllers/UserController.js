const { User } = require("../models");
const bcrypt = require("bcrypt");
const sequelize = require("sequelize");

module.exports = {
  async allUsers(req, res) {
    try {
      const users = await User.findAll();

      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).send({ error: "Searching failed" });
    }
  },

  async newUser(req, res) {
    try {
      const { username, password, password2 } = req.body;
      if (username && password) {
        if (password2 && password === password2) {
          const userExist = User.findOne({
            where: {
              username: username
            }
          }).then(function(user) {
            if (user) {
              return res.json({
                sucess: false,
                message: "This username has no avaliable"
              });
            } else {
              const generateHash = function(password) {
                return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
              };
              const userPassword = generateHash(password);
              const data = {
                username: req.body.username,
                password: userPassword
              };
              User.create(data).then(function(newUser, created) {
                if (!newUser) {
                  res.json({ sucess: false, message: err, statusCode: 500 });
                }
                if (newUser) {
                  return res.status(200).json(newUser);
                }
              });
            }
          });
        } else {
          res.json({
            sucess: false,
            message: "Password doesnt match",
            statusCode: 400
          });
        }
      } else {
        res.json({
          sucess: false,
          message: "Username and password fields are requireds",
          statusCode: 400
        });
      }
    } catch (error) {
      return res.status(400).send({ error: "Restration failed" });
    }
  },

  async authenticate(req, res) {
    const { username, password } = req.body;
    const user = await User.findOne({
      where: {
        username: username
      }
    });

    if (!user) {
      return res.status(400).send({ error: "User not found" });
    }

    if (user.isAdmin === true && password === user.password) {
      return res.send({ user });
    } else if (!await bcrypt.compare(password, user.password)) {
      return res.status(400).send({ error: "Invalid password" });
    }

    return res.send({ user });
  }
};
