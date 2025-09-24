const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

async function cancelamento(req, res) {
  const { protocolo, evento, dtHoraEvento } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    const msg = `${evento}: Pedido ${protocolo} não encontrado`;
    logger.error(msg);
    return res.status(404).json({ message: msg });
  }

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
  const msg = `Pedido ${protocolo}: Evento ${evento} realizado com sucesso`;
  return res.status(200).json({ message: msg });
}

module.exports = {
  cancelamento,
};
