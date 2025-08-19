const express = require("express");
const routesOrigens = require("./origens");
const routesUsers = require("./users");
const routes = express.Router();
routes.use(routesOrigens);
routes.use(routesUsers);

routes.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

routes.get("/", (req, res) => {
  res.status(200).json("API is running");
});

module.exports = routes;
