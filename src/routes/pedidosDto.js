const express = require("express");
const routesPedidosDto = express.Router();
const {
  getPedidosDto,
  getPorDataRenovacao,
  getPorEmissaoValidade,
  getPorPedidoOrigem,
  getPorStatus,
  getPorTipoDePagamento,
  getById,
  getAnaliseDeVendas,
} = require("../controllers/pedidosDto");
routesPedidosDto.get("/pedidosdto", getPedidosDto);
routesPedidosDto.post("/pedidosdto/pordatarenovacao", getPorDataRenovacao);
routesPedidosDto.post("/pedidosdto/poremissaovalidade", getPorEmissaoValidade);
routesPedidosDto.post("/pedidosdto/porpedidoorigem", getPorPedidoOrigem);
routesPedidosDto.post("/pedidosdto/porstatus", getPorStatus);
routesPedidosDto.post("/pedidosdto/portipodepagamento", getPorTipoDePagamento);
routesPedidosDto.post("/pedidosdto/analisedevendas", getAnaliseDeVendas);
routesPedidosDto.get("/pedidosdto/:id", getById);

module.exports = routesPedidosDto;
