const PedidosModel = require("../models/PedidoDto");
const dao = require("../dao/pedidodto");
const op = require("sequelize");
const logger = require("../logger");

async function getPedidosDto(req, res) {
  const options = req.body.options || {};
  const allPedidos = await PedidosModel.findAll(options);
  return res.status(200).json({ result: allPedidos });
}
async function getPorDataRenovacao(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorDataRenovacao(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por data de renovacao:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPorEmissaoValidade(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorEmissaoValidade(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por emissao e validade:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPorPedidoOrigem(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorPedidoOrigem(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por pedido origem:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPorStatus(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorStatus(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por status:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPorTipoDePagamento(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorTipoDePagamento(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por tipo de pagamento:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getAnaliseDeVendas(req, res) {
  parametros = req.body;
  const allPedidos = await dao.AnaliseDeVendas(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por analise de vendas:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPedidosAVencer(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosAVencer(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos a vencer:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPedidosAVencerSemRenovacoes(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosAVencerSemRenovacoes(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos a vencer sem renovações:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPedidosANotificar(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosANotificar(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos a notificar:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getPedidosPorCliente(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosPorCliente(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    logger.error("Error fetching pedidos por cliente:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}

async function getById(req, res) {
  const { id } = req.params;
  const pedido = await dao.PedidoDtoById(id);
  if (!pedido) {
    return res.status(404).json({ error: "Pedido não encontrado" });
  }
  return res.status(200).json(pedido);
}

module.exports = {
  getPedidosDto,
  getPorDataRenovacao,
  getPorEmissaoValidade,
  getPorPedidoOrigem,
  getPorStatus,
  getPorTipoDePagamento,
  getById,
  getAnaliseDeVendas,
  getPedidosAVencer,
  getPedidosAVencerSemRenovacoes,
  getPedidosANotificar,
  getPedidosPorCliente,
};
