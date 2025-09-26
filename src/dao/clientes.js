const ClienteModel = require("../models/Cliente");
const logger = require("../logger");
const dao = require("../dao/genericDao");

async function ClienteById(id) {
  return await dao.FindByPk(ClienteModel, id);
}

async function DeleteCliente(cliente) {
  try {
    await dao.Delete(cliente);
    logger.info(`Cliente ${cliente.nome} excluído com sucesso`);
  } catch (err) {
    logger.err(`Erro na exclusão cliente ${cliente.nome}: ${err.message}`);
  }
}

async function UpdateCliente(cliente) {
  try {
    await dao.Update(cliente);
    logger.info(`Cliente ${cliente.nome} atualizado com sucesso`);
  } catch (err) {
    logger.err(
      `Erro na atualização do cliente ${cliente.nome}: ${err.message}`
    );
  }
}

async function ClienteByCnpjcpf(cnpjcpf) {
  return await dao.FindOne(ClienteModel, {
    where: { identificacao_cnpjcpf: cnpjcpf },
  });
}

async function InsertCliente(cliente) {
  try {
    logger.info("Inserindo cliente ", cliente);
    await dao.Insert(cliente);
    logger.info(`Cliente ${cliente.nome} inserido com sucesso`);
  } catch (err) {
    logger.err(`Erro na inclusão do cliente ${cliente.nome}: ${err.message}`);
  }
}

module.exports = {
  ClienteById,
  UpdateCliente,
  InsertCliente,
  ClienteByCnpjcpf,
  DeleteCliente,
};
