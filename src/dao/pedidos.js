const PedidosModel = require("../models/Pedido");
const logger = require("../logger");

async function PedidoByProtocolo(protocolo) {
  //logger.info("Buscando pedido pelo protocolo:", protocolo);

  const retorno = await PedidosModel.findOne({
    where: { pedidoorigem: protocolo },
  });

  return retorno;
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
};
