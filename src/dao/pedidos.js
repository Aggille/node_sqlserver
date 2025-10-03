const PedidosModel = require("../models/Pedido");
const logger = require("../logger");

async function PedidoByProtocolo(protocolo) {
  const pedido = await PedidosModel.findOne({
    where: { pedidoorigem: protocolo },
  });

  return pedido;
}

async function PedidoByProtocoloWithMessage(protocolo, req, res) {
  const { evento } = req.body;

  const pedido = await PedidosModel.findOne({
    where: { pedidoorigem: protocolo },
  });

  if (!pedido) {
    const msg = `${
      evento ?? "Evento Indefinido"
    }: Pedido ${protocolo} não encontrado`;
    logger.error(msg);
    res.status(404).json({ message: msg });
    return null;
  } else {
    return pedido;
  }
}

async function PedidoById(id) {
  return await PedidosModel.findByPk(id);
}

async function UpdatePedido(pedido) {
  await pedido.save();
  //logger.info("Pedido atualizado com sucesso ", pedido.numeroserie, pedido.id);
}

module.exports = {
  PedidoByProtocolo,
  PedidoById,
  UpdatePedido,
  PedidoByProtocoloWithMessage,
};
