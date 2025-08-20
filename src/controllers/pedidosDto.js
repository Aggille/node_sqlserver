const PedidosModel = require("../models/PedidoDto");
const op = require("sequelize");

async function getPedidosDto(req, res) {
  const options = req.body.options || {};

  console.log(options);

  const allPedidos = await PedidosModel.findAll(options);

  return res.status(200).json({ result: allPedidos });
}

module.exports = {
  getPedidosDto,
};
