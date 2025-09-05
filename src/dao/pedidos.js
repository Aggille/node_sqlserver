const PedidosModel = require("../models/Pedido");

async function PedidoByProtocolo(protocolo) {
  console.log("Buscando pedido pelo protocolo:", protocolo);

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
  console.log("Pedido atualizado com sucesso ", pedido.numeroserie, pedido.id);
}

module.exports = {
  PedidoByProtocolo,
  PedidoById,
  UpdatePedido,
};
