const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");

async function revogacao(req, res) {
  const { protocolo, evento, dtHoraEvento, responsavelEvento } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return { status: 404, message: "Pedido não encontrado" };
  }

  const obs = `Revogação notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  const dataRevogacao = dtHoraEvento;
  pedido.datarevogacao = dataRevogacao;
  pedido.observacoes = obs;
  pedido.status = 3; // revogado
  await UpdatePedido(pedido);
  return res.status(200).json({ message: "Revogação notificada com sucesso" });
}

module.exports = {
  revogacao,
};
