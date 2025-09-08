const Evento = require("../models/Evento");
const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
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

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado" });
  }

  const obs = `Verificação notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  const dataVerificacao = dtHoraEvento;
  pedido.dataverificacao = dataVerificacao;
  pedido.observacoes = obs;
  pedido.status = 1; // pendente
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
    .json({ message: "Verificação notificada com sucesso" });
}

module.exports = {
  verificacao,
};
