const CrmModel = require("../models/CrmDto");
const dao = require("../dao/crmdto");
const op = require("sequelize");
const logger = require("../logger");
function getFuncName() {
  return getFuncName.caller.name;
}

async function ShowError(res, err) {
  const modulo = getFuncName();
  logger.error(`Error fetching ${modulo}:`, err).message;
  return res.status(500).json({ Error: err.message });
}

async function getPesquisaCrmDto(req, res) {
  console.log(req.body);
  parametros = req.body;
  const alDto = await dao.PesquisaCrmDto(parametros);
  try {
    return res.status(200).json(alDto);
  } catch (error) {
    await ShowError(res, err);
  }
}

module.exports = { getPesquisaCrmDto };
