const ClienteModel = require("../models/Cliente");
const logger = require("../logger");
async function ClienteById(id) {
  return await ClienteModel.findByPk(id);
}

async function UpdateCliente(cliente) {
  await cliente.save();
  logger.info("Cliente atualizado com sucesso ", cliente.id);
}

async function ClienteByCnpjcpf(cnpjcpf) {
  return await ClienteModel.findOne({
    where: { identificacao_cnpjcpf: cnpjcpf },
  });
}

async function InsertCliente(cliente) {
  logger.info("Inserindo cliente ", cliente);
  await cliente.save();
  logger.info("Cliente inserido com sucesso ", cliente.id);
}

module.exports = {
  ClienteById,
  UpdateCliente,
  InsertCliente,
  ClienteByCnpjcpf,
};
