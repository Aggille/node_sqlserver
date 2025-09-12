const PedidosModel = require("../models/PedidoDto");
const op = require("sequelize");
const logger = require("../logger");

async function getPedidosDto(req, res) {
  const options = req.body.options || {};

  //logger.info("Consultando pedidos com as opções:", options);

  const allPedidos = await PedidosModel.findAll(options);

  return res.status(200).json({ result: allPedidos });
}

module.exports = {
  getPedidosDto,
};
