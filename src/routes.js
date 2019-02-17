const routes = require("express").Router();

const { Group } = require("./models");
const { Category } = require("./models");
const { Product } = require("./models");
const { User } = require("./models");
const { Comanda } = require("./models");
const { Pedido } = require("./models");

const GroupController = require("./controllers/GroupController");
const CategoryController = require("./controllers/CategoryController");
const ProductController = require("./controllers/ProductController");
const UserController = require("./controllers/UserController");
const ComandaController = require("./controllers/ComandaController");
const PedidoController = require("./controllers/PedidoController");

// Groups Routes
routes.get("/groups", GroupController.index);
routes.get("/groups/:id", GroupController.show);
routes.post("/groups/register", GroupController.store);
routes.put("/groups/:id", GroupController.update);
routes.delete("/groups/:id", GroupController.destroy);

// Categories Routes
routes.get("/categories", CategoryController.index);
routes.get("/categories/:id", CategoryController.show);
routes.post("/categories/register", CategoryController.store);
routes.put("/categories/:id", CategoryController.update);
routes.delete("/categories/:id", CategoryController.destroy);

// Products Routes
routes.get("/products", ProductController.index);
routes.get("/products/:id", ProductController.show);
routes.post("/products/register", ProductController.store);
routes.put("/products/:id", ProductController.update);
routes.delete("/products/:id", ProductController.destroy);

// User Routes
routes.get("/user", UserController.allUsers);
routes.post("/user/register", UserController.newUser);
routes.post("/user/auth", UserController.authenticate);

// Comandas Routes
routes.get("/comandas", ComandaController.index);
routes.get("/comandas/:id", ComandaController.show);
routes.post("/comandas/register", ComandaController.store);
routes.put("/comandas/:id", ComandaController.update);
routes.delete("/comandas/:id", ComandaController.destroy);

// Pedidos Routes
routes.get("/pedidos", PedidoController.index);
routes.get("/pedidos/:id", PedidoController.show);
routes.post("/pedidos/register", PedidoController.store);
routes.put("/pedidos/:id", PedidoController.update);
routes.delete("/pedidos/:id", PedidoController.destroy);

module.exports = routes;
