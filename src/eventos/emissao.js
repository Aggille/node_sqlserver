const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function emissao(req, res) {
  const {
    protocolo,
    inicioValidade,
    fimValidade,
    numeroSerie,
    dtHoraEvento,
    evento,
  } = req.body;

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  if (!pedido) {
    return;
  }

  const validade = fimValidade;
  const horaInicial = inicioValidade.substring(11, 19);
  const horaFinal = fimValidade.substring(11, 19);
  const obs = `Emissão notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  pedido.validade = validade;
  pedido.horainicialvalidade = horaInicial;
  pedido.horafinalvalidade = horaFinal;
  pedido.numeroserie = numeroSerie;
  pedido.status = 2;
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

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = { emissao };
