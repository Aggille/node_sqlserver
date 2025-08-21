const express = require("express");
const routesNotificaEventos = express.Router();
const eventosMiddleware = require("../middlewares/eventosMiddleware");
const {
  emissao,
  solicitacao,
  validacao,
  verificacao,
} = require("../controllers/notificaeventos");

routesNotificaEventos.post("/notificaEmissao", eventosMiddleware, emissao);
routesNotificaEventos.post(
  "/notificaSolicitacao",
  eventosMiddleware,
  solicitacao
);
routesNotificaEventos.post("/notificaValidacao", eventosMiddleware, validacao);
routesNotificaEventos.post(
  "/notificaVerificacao",
  eventosMiddleware,
  verificacao
);

module.exports = routesNotificaEventos;
