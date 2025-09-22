const PedidosModel = require("../models/Pedido");
const op = require("sequelize");
const logger = require("../logger");

async function getPedidos(req, res) {
  const options = req.body.options || {};
  const allPedidos = await PedidosModel.findAll(options);
  return res.status(200).json({ result: allPedidos });
}

module.exports = {
  getPedidos,
};
