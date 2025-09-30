const { Sequelize } = require("sequelize");
const dao = require("../dao/genericDao");
const CrmDtoModel = require("../models/CrmDto");

async function GetAll(where, order) {
  return await dao.FindAll(CrmDtoModel, where, order);
}

async function PesquisaCrmDto(parametros) {
  const aWhere = {
    data: {
      [Sequelize.Op.between]: [parametros.dataInicial, parametros.dataFinal],
    },
    pedidos_vencimento: {
      [Sequelize.Op.between]: [
        parametros.validadeInicial ?? "0001-01-01",
        parametros.validadeFinal ?? "9999-01-01",
      ],
    },
    cliente_cnpjcpf: parametros.clienteCnpjCpf
      ? { [Sequelize.Op.like]: `%${parametros.clienteCnpjCpf}%` }
      : {
          [Sequelize.Op.and]: [
            Sequelize.literal("coalesce( Cliente_CnpjCpf,'' ) <> ''"),
          ],
        },
    // Case-insensitive LIKE},
    idstatus:
      parametros.idStatus > 0 ? parametros.idStatus : { [Sequelize.Op.gte]: 0 },
    tipocontato:
      parametros.tipoContato > 0
        ? parametros.tipoContato
        : { [Sequelize.Op.gte]: 0 },
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
  };
  const aOrder = [["data", "ASC"]];

  return GetAll(aWhere, aOrder);
}

module.exports = { PesquisaCrmDto };
