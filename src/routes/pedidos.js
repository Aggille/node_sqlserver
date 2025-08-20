const express = require("express");
const routesPedidos = express.Router();
const { getPedidos } = require("../controllers/pedidos");
routesPedidos.get("/pedidos", getPedidos);

module.exports = routesPedidos;
