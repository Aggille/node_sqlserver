const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function revogacao(req, res) {
  const { protocolo, evento, dtHoraEvento, responsavelEvento } = req.body;

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  const obs = `Revogação notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  const dataRevogacao = dtHoraEvento;
  pedido.datarevogacao = dataRevogacao;
  pedido.observacoes = obs;
  pedido.status = 3; // revogado
  await UpdatePedido(pedido);

  const horaEvento = dtHoraEvento.substring(11, 19);
  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dtHoraEvento.substring(0, 10),
    horaevento: horaEvento,
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel);
}

module.exports = {
  revogacao,
};
