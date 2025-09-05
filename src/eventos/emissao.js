const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

async function emissao(req, res) {
  console.log("Processando evento de emissão:", req.body);
  const {
    protocolo,
    inicioValidade,
    fimValidade,
    numeroSerie,
    dtHoraEvento,
    evento,
  } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);
  if (!pedido) {
    return { status: 404, message: "Pedido não encontrado" };
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

  await InsertEvento(eventoModel);

  return res.status(200).json({ message: "Emissão notificada com sucesso" });
}

module.exports = { emissao };
