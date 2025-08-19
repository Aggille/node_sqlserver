const express = require("express");
const routesUsers = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware");
const schemaValidator = require("../middlewares/schemaValidator");
const { getUsers, getUserById, postUser } = require("../controllers/users");
const userSchema = require("../database/schemas/user.schema.json");

routesUsers.get("/users/:id", verifyToken, getUserById);
routesUsers.get("/users/", verifyToken, getUsers);
routesUsers.post("/user/", verifyToken, schemaValidator(userSchema), postUser);

module.exports = routesUsers;
