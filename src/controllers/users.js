const UserModel = require("../models/User");
const { Op } = require("sequelize");

async function userExists(userName, email) {
  return await UserModel.findOne({
    where: {
      [Op.or]: [{ email }, { user_name: userName }],
    },
  });
}

function validateUserData(req, res, next) {
  const { name, email, password, user_name } = req.body;
  if (
    !name ||
    !email ||
    !password ||
    !user_name ||
    name.trim() === "" ||
    email.trim() === "" ||
    user_name.trim() === "" ||
    password.trim() === ""
  ) {
    return res
      .status(400)
      .json({ error: "Nome, email, nome de usuário e senha são obrigatórios" });
  }
  next();
}

async function deleteUser(req, res) {
  console.log(req.body);

  const user = await UserModel.findByPk(req.body.id);
  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  try {
    await user.destroy();
    return res.status(204).send();
  } catch (ex) {
    return res
      .status(500)
      .json({ error: "Erro ao deletar usuário: " + ex.message });
  }
}

async function putUser(req, res) {
  const user = await UserModel.findByPk(req.body.id);

  if (!user) {
    return res.status(404).json({ error: "Usuário não encontrado" });
  }

  user.gender = req.body.gender;
  user.bio = req.body.bio;
  user.image = req.body.image;
  user.name = req.body.name;

  validateUserData(req, res, async () => {
    try {
      await user.update(req.body);
      return res.status(200).send();
    } catch (ex) {
      return res
        .status(500)
        .json({ error: "Erro ao atualizar usuário: " + ex.message });
    }
  });
}

async function postUser(req, res) {
  const u = await userExists(req.body.user_name, req.body.email);

  if (u) {
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

module.exports = { getUsers, getUserById, postUser, putUser, deleteUser };
