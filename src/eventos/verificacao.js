const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function verificacao(req, res) {
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    acao,
    motivoRecusa,
    dtAcao,
    dtAberturaProtocolo,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    razaoSocialPosto,
    apelidoPosto,
  } = req.body;

  const dataEvento = dtHoraEvento.substring(0, 10);
  const horaEvento = dtHoraEvento.substring(11, 19);

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);
  if (!pedido) {
    return;
  }

  const obs = `Verificação notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  pedido.dataverificacao = dataEvento;
  pedido.observacoes = obs;
  pedido.status = 1; // pendente
  await UpdatePedido(pedido);

  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dataEvento,
    horaevento: horaEvento,
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  verificacao,
};
