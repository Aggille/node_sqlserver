const express = require("express");
const routesUsers = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const schemaValidator = require("../middlewares/schemaValidator");
const {
  getUsers,
  getUserById,
  postUser,
  putUser,
  deleteUser,
} = require("../controllers/users");
const userSchema = require("../database/schemas/user.schema.json");

routesUsers.get("/user/:id", verifyToken, getUserById);
routesUsers.get("/users/", verifyToken, getUsers);
routesUsers.post("/user/", verifyToken, schemaValidator(userSchema), postUser);
routesUsers.put("/user/", verifyToken, schemaValidator(userSchema), putUser);
routesUsers.delete("/user/", verifyToken, deleteUser);

module.exports = routesUsers;
