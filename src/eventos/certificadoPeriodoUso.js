const { PedidoByProtocoloWithMessage } = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function certificadoPeriodoUso(req, res) {
  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  if (!pedido) {
    return;
  }
  const dataEvento = dtHoraEvento.substring(0, 10);
  const horaEvento = dtHoraEvento.substring(11, 19);

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: dataEvento,
    horaevento: horaEvento,
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  certificadoPeriodoUso,
};
