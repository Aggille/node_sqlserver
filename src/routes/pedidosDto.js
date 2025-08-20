const express = require("express");
const routesPedidosDto = express.Router();
const { getPedidosDto } = require("../controllers/pedidosDto");
routesPedidosDto.get("/pedidosdto", getPedidosDto);

module.exports = routesPedidosDto;
