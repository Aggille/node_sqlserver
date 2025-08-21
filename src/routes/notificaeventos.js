const express = require("express");
const routesNotificaEventos = express.Router();
const eventosMiddleware = require("../middlewares/eventosMiddleware");

routesNotificaEventos.post("/notifica", eventosMiddleware);

module.exports = routesNotificaEventos;
