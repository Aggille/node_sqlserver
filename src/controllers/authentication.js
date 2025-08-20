const jwt = require("jsonwebtoken");
const Users = require("../models/User");
const { Op } = require("sequelize");
const { encrypt, decrypt } = require("../utils/crypt");

class AuthenticationController {
  async authenticate(req, res) {
    const { email, user_name, password } = req.body;

    try {
      const whereClause = {};
      if (email) {
        whereClause.email = email;
      } else if (user_name) {
        whereClause.user_name = user_name;
      } else {
        return res
          .status(401)
          .json({ message: "Username ou email não informado" });
      }

      const user = await Users.findOne({
        where: whereClause,
      });

      if (!user || !(await user.checkPassword(password))) {
        return res.status(401).json({ message: "Usuário / senha inválidos" });
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
