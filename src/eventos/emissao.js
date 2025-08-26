const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");

async function emissao(req, res) {
  console.log("Processando evento de emissão:", req.body);
  const { protocolo, inicioValidade, fimValidade, numeroSerie } = req.body;
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
  pedido.observacoes = obs;
  await UpdatePedido(pedido);
  return res.status(200).json({ message: "Emissão notificada com sucesso" });
}

module.exports = { emissao };
