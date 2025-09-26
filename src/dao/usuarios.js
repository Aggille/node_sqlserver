const UsuarioModel = require("../models/Usuario");
const logger = require("../logger");
const dao = require("../dao/genericDao");

async function UsuarioById(id) {
  return await dao.FindByPk(UsuarioModel, id);
}

async function UsuarioByCpf(cpf) {
  return await dao.FindOne(UsuarioModel, { where: { cpf: cpf } });
}

async function UpdateUsuario(usuario) {
  try {
    await dao.Update(usuario);
    logger.info(`Usuário ${usuario.nome} atualizado com sucesso`);
  } catch (err) {
    logger.error(
      `Erro na atualização do usuário ${usuario.nome}: ${err.message}`
    );
  }
}

async function ByUsuarioSenha(usuario, senha) {
  return await dao.FindOne(UsuarioModel, {
    where: { usuario: usuario, senha: senha },
  });
}

async function InsertUsuario(usuario) {
  try {
    await dao.Insert(usuario);
    logger.info(`Usuário ${usuario.nome} incluído com sucesso`);
  } catch (err) {
    logger.error(`Erro na inclusão do usuário ${usuario.nome}: ${err.message}`);
  }
}

async function DeleteUsuario(usuario) {
  try {
    await dao.Delete(usuario);
    logger.info(`Usuário ${usuario.nome} excluído com sucesso`);
  } catch (err) {
    logger.error(`Erro na exclusão do usuário ${usuario.nome}: ${err.message}`);
  }
}

module.exports = {
  UsuarioById,
  ByUsuarioSenha,
  UpdateUsuario,
  InsertUsuario,
  DeleteUsuario,
  UsuarioByCpf,
};
