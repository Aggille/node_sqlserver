const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
async function cancelamento(req, res) {
  const { protocolo, evento, dtHoraEvento, responsavelEvento } = req.body;

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

  return res
    .status(200)
    .json({ message: "Cancelamento notificado com sucesso" });
}

module.exports = {
  cancelamento,
};
