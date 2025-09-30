const logger = require("../logger");
const { Sequelize, sql } = require("sequelize");
const { format } = require("date-fns");
const { id } = require("date-fns/locale");
const dao = require("../dao/genericDao");
const CrmDto = require("../models/CrmDto");

async function PesquisaCrmDto(parametros) {
  return {};
}

module.exports = { PesquisaCrmDto };
