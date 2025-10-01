const { PedidoByProtocoloWithMessage } = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function solicitacaoPeriodoUso(req, res) {
  const {
    evento,
    protocolo,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    nomeTitular,
    cpfTitular,
    primeiraEmissao,
  } = req.body;

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);
  if (!pedido) {
    return;
  }

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  solicitacaoPeriodoUso,
};
