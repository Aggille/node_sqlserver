const express = require("express");
const routesOrigens = require("./origens");
const routesUsers = require("./users");
const routesPedidosDto = require("./pedidosDto");
const routesPedidos = require("./pedidos");
const routes = express.Router();
const Auth = require("../controllers/authentication");
const authSchema = require("../database/schemas/auth.schema.json");
const schemaValidator = require("../middlewares/schemaValidator");
const authentication = require("../middlewares/authentication");

routes.use(routesOrigens);

routes.get("/", (req, res) => {
  res.status(200).json("API is running");
});

routes.post("/auth", schemaValidator(authSchema), (req, res) => {
  Auth.authenticate(req, res);
});

routes.use(routesPedidosDto);
routes.use(routesPedidos);

// tudo abaixo daqui tem que estar autenticado
routes.use(authentication);

routes.use(routesUsers);
routes.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

module.exports = routes;
