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
  getPedidosAVencer,
  getPedidosAVencerSemRenovacoes,
  getAnaliseDeVendas,
  getPedidosANotificar,
  getPedidosPorCliente,
  getGerencial,
  getPorPagamentoComissao,
  getPorEmissao,
} = require("../controllers/pedidosDto");
routesPedidosDto.get("/pedidosdto", getPedidosDto);
routesPedidosDto.post("/pedidosdto/pordatarenovacao", getPorDataRenovacao);
routesPedidosDto.post("/pedidosdto/poremissaovalidade", getPorEmissaoValidade);
routesPedidosDto.post("/pedidosdto/porpedidoorigem", getPorPedidoOrigem);
routesPedidosDto.post("/pedidosdto/porstatus", getPorStatus);
routesPedidosDto.post("/pedidosdto/porcliente", getPedidosPorCliente);
routesPedidosDto.post("/pedidosdto/portipodepagamento", getPorTipoDePagamento);
routesPedidosDto.post("/pedidosdto/analisedevendas", getAnaliseDeVendas);
routesPedidosDto.post("/pedidosdto/gerencial", getGerencial);
routesPedidosDto.post("/pedidosdto/poremissao", getPorEmissao);
routesPedidosDto.get("/pedidosdto/:id", getById);
routesPedidosDto.post("/pedidosdto/pedidosavencer", getPedidosAVencer);
routesPedidosDto.post(
  "/pedidosdto/porpagamentocomissao",
  getPorPagamentoComissao
);
routesPedidosDto.post(
  "/pedidosdto/pedidosavencersemrenovacoes",
  getPedidosAVencerSemRenovacoes
);
routesPedidosDto.post("/pedidosdto/pedidosanotificar", getPedidosANotificar);

module.exports = routesPedidosDto;
