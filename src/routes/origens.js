const express = require("express");
const routesOrigens = express.Router();
const { getOrigens, getOrigemById } = require("../controllers/origens");
const { verifyToken } = require("../middlewares/AuthMiddleware");

routesOrigens.get("/origens/:id", verifyToken, getOrigemById);
routesOrigens.get("/origens", verifyToken, getOrigens);

module.exports = routesOrigens;
