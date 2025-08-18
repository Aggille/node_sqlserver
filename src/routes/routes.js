const express = require("express");
const routesOrigens = require("./origens");
const routes = express.Router();
routes.use(routesOrigens);

routes.get("/health", (req, res) => {
  res.status(200).json({ status: "UP" });
});

routes.get("/", (req, res) => {
  res.status(200).json("API is running");
});

module.exports = routes;
