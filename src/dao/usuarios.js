const UsuarioModel = require("../models/Usuario");
const logger = require("../logger");

async function UsuarioById(id) {
  return await UsuarioModel.findByPk(id);
}

async function UsuarioByCpf(cpf) {
  return await UsuarioModel.findOne({ where: { cpf: cpf } });
}

async function UpdateUsuario(usuario) {
  await usuario.save();
  //logger.info("Usuário atualizado com sucesso ", usuario.id);
}

async function InsertUsuario(usuario) {
  logger.info("Inserindo usuário ", usuario);
  await usuario.save();
  logger.info("Usuário inserido com sucesso ", usuario.id);
}

module.exports = {
  UsuarioById,
  UpdateUsuario,
  InsertUsuario,
  UsuarioByCpf,
};
