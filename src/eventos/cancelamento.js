const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

async function cancelamento(req, res) {
  const { protocolo, evento, dtHoraEvento } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return { status: 404, message: "Pedido não encontrado" };
  }

  const obs = `Cancelamento notificado em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  const dataCancelamento = dtHoraEvento;
  pedido.datacancelamento = dataCancelamento;
  pedido.observacoes = obs;
  pedido.status = 6; // cancelado
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

  await InsertEvento(eventoModel);

  return res
    .status(200)
    .json({ message: "Cancelamento notificado com sucesso" });
}

module.exports = {
  cancelamento,
};
