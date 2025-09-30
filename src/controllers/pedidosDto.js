const PedidosModel = require("../models/PedidoDto");
const dao = require("../dao/pedidodto");
const daoGeneric = require("../dao/genericDao");
const op = require("sequelize");
const logger = require("../logger");

function getFuncName() {
  return getFuncName.caller.name;
}

async function ShowError(res, err) {
  const modulo = getFuncName();
  logger.error(`Error fetching ${modulo}:`, err).message;
  return res.status(500).json({ Error: err.message });
}

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
    await ShowError(res, err);
  }
}

async function getPorEmissaoValidade(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorEmissaoValidade(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPorPedidoOrigem(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorPedidoOrigem(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPorStatus(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorStatus(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPorTipoDePagamento(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorTipoDePagamento(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getAnaliseDeVendas(req, res) {
  parametros = req.body;
  const allPedidos = await dao.AnaliseDeVendas(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPedidosAVencer(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosAVencer(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPedidosAVencerSemRenovacoes(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosAVencerSemRenovacoes(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPedidosANotificar(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosANotificar(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPedidosPorCliente(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PedidosPorCliente(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
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

async function getGerencial(req, res) {
  parametros = req.body;
  const allPedidos = await dao.Gerencial(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (err) {
    await ShowError(res, err);
  }
}

async function getPorPagamentoComissao(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorPagamentoComissao(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
}

async function getPorEmissao(req, res) {
  parametros = req.body;
  const allPedidos = await dao.PorEmissao(parametros);
  try {
    return res.status(200).json(allPedidos);
  } catch (error) {
    await ShowError(res, err);
  }
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
  getGerencial,
  getPorPagamentoComissao,
  getPorEmissao,
};
