const PedidosModel = require("../models/Pedido");
const logger = require("../logger");
const dao = require("../dao/genericDao");

async function PedidoByProtocolo(protocolo) {
  const pedido = await PedidosModel.findOne({
    where: { pedidoorigem: protocolo },
  });

  return pedido;
}

async function PedidoByProtocoloWithMessage(protocolo, req, res) {
  const { evento } = req.body;

  const pedido = await dao.FindOne(PedidosModel, {
    where: { pedidoorigem: protocolo },
  });

  if (!pedido) {
    const msg = `${
      evento ?? "Evento Indefinodo"
    }: Pedido ${protocolo} não encontrado`;
    logger.error(msg);
    return res.status(404).json({ message: msg });
  } else {
    return pedido;
  }
}

async function PedidoById(id) {
  return await dao.FindByPk(PedidosModel, id);
}

async function UpdatePedido(pedido) {
  try {
    await dao.Update(pedido);
    logger.info(`Pedido ${pedido.pedidoorigem} atualizado com sucesso`);
  } catch (err) {
    logger.error(
      `Erro ao gravar pedido ${pedido.pedidoorigem}: ${err.message}`
    );
  }
}

async function InsertPedido(pedido) {
  try {
    await dao.Insert(pedido);
    logger.info(`Pedido ${pedido.pedidoorigem} incluído com sucesso`);
  } catch (err) {
    logger.error(
      `Erro ao incluir pedido ${pedido.pedidoorigem}: ${err.message}`
    );
  }
}

async function DeletePedido(pedido) {
  try {
    await dao.Delete(pedido);
    logger.info(`Pedido ${pedido.pedidoorigem} excluído com sucesso`);
  } catch (err) {
    logger.error(
      `Erro ao excluir pedido ${pedido.pedidoorigem}: ${err.message}`
    );
  }
}

module.exports = {
  PedidoByProtocolo,
  PedidoById,
  InsertPedido,
  UpdatePedido,
  DeletePedido,
  PedidoByProtocoloWithMessage,
};
