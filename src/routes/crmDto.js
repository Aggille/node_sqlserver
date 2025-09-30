const express = require("express");
const routesCrmDto = express.Router();
const { getPesquisaCrmDto } = require("../controllers/crmDto");

routesCrmDto.post("/crmdto/pesquisacrmdto", getPesquisaCrmDto);

module.exports = routesCrmDto;
