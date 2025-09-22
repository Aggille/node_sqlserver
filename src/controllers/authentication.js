const jwt = require("jsonwebtoken");
const Usuarios = require("../models/Usuario");
const { Op } = require("sequelize");
const { encrypt, decrypt } = require("../utils/crypt");
const { log } = require("winston");

class AuthenticationController {
  async authenticate(req, res) {
    const { login, senha } = req.body;

    try {
      const whereClause = {};
      if (login) {
        whereClause.login = login;
      } else if (senha) {
        whereClause.senha = senha;
      } else {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      const user = await Usuarios.findOne({
        where: whereClause,
      });

      if (!user) {
        return res.status(401).json({ message: "Usuário ou senha inválidos" });
      }

      const { id } = user;
      const { iv, content } = encrypt(id);
      const newId = `${iv}:${content}`;

      const token = jwt.sign({ userId: newId }, process.env.JWT_SECRET, {
        expiresIn: process.env.EXPIRE_TOKEN || "7d",
      });

      res.json({ token });
    } catch (error) {
      console.error("Authentication error:", error);
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new AuthenticationController();
