const ClienteModel = require("../models/Cliente");

async function ClienteById(id) {
  return await ClienteModel.findByPk(id);
}

async function UpdateCliente(cliente) {
  await cliente.save();
  console.log("Cliente atualizado com sucesso ", cliente.id);
}

async function InsertCliente(cliente) {
  console.log("Inserindo cliente ", cliente);
  await cliente.save();
  console.log("Cliente inserido com sucesso ", cliente.id);
}

module.exports = {
  ClienteById,
  UpdateCliente,
  InsertCliente,
};
