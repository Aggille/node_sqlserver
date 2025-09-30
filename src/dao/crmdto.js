const { Sequelize } = require("sequelize");
const dao = require("../dao/genericDao");
const CrmDtoModel = require("../models/CrmDto");

async function GetAll(where, order) {
  return await dao.FindAll(CrmDtoModel, where, order);
}

async function PesquisaCrmDto(parametros) {
  let wData = "";
  let wValidade = "";
  wValidade = `cast( pedidos_vencimento as date ) between '${parametros.validadeInicial}' and '${parametros.validadeFinal}'`;
  wData += `cast( data  as date ) between '${parametros.dataInicial}' and '${parametros.dataFinal}'`;

  const aWhere = {
    [Sequelize.Op.and]: [
      Sequelize.literal(wValidade),
      Sequelize.literal(wData),
    ],

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
  const aOrder = [["data", "DESC"]];

  return GetAll(aWhere, aOrder);
}

module.exports = { PesquisaCrmDto };
