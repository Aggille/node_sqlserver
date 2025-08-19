const UserModel = require("../models/User");
const { Op } = require("sequelize");

function validateUserData(req, res, next) {
  const { name, email, password_hash, user_name } = req.body;
  if (
    !name ||
    !email ||
    !password_hash ||
    !user_name ||
    name.trim() === "" ||
    email.trim() === "" ||
    user_name.trim() === "" ||
    password_hash.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Nome, email, nome de usuário e senha são obrigatórios" });
  }
  next();
}

async function postUser(req, res) {
  const userExists = await UserModel.findOne({
    where: {
      [Op.or]: [{ email: req.body.email }, { user_name: req.body.user_name }],
    },
  });

  if (userExists) {
    return res.status(400).json({ error: "Usuário já existe" });
  }

  validateUserData(req, res, async () => {
    try {
      const user = await UserModel.create(req.body);
      return res.status(201).json({ result: user });
    } catch (ex) {
      return res
        .status(500)
        .json({ error: "Erro ao criar usuário: " + ex.message });
    }
  });
}

async function getUsers(req, res) {
  const allUsers = await UserModel.findAll();
  return res.status(200).json({ result: allUsers });
}

async function getUserById(req, res) {
  const { id } = req.params;
  const user = await UserModel.findByPk(id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }
  return res.status(200).json({ result: user });
}

module.exports = { getUsers, getUserById, postUser };
