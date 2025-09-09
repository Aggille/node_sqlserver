const UsuarioModel = require("../models/Usuario");

async function UsuarioById(id) {
  return await UsuarioModel.findByPk(id);
}

async function UsuarioByCpf(cpf) {
  return await UsuarioModel.findOne({ where: { cpf: cpf } });
}

async function UpdateUsuario(usuario) {
  await usuario.save();
  console.log("Usuário atualizado com sucesso ", usuario.id);
}

async function InsertUsuario(usuario) {
  console.log("Inserindo usuário ", usuario);
  await usuario.save();
  console.log("Usuário inserido com sucesso ", usuario.id);
}

module.exports = {
  UsuarioById,
  UpdateUsuario,
  InsertUsuario,
};
