const express = require("express");
const routesNotificaEventos = express.Router();
const {
  emissao,
  solicitacao,
  validacao,
  verificacao,
} = require("../controllers/notificaeventos");

routesNotificaEventos.post("/notificaEmissao", emissao);
routesNotificaEventos.post("/notificaSolicitacao", solicitacao);
routesNotificaEventos.post("/notificaValidacao", validacao);
routesNotificaEventos.post("/notificaVerificacao", verificacao);

module.exports = routesNotificaEventos;
