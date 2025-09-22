const PedidoDtoModel = require("../models/PedidoDto");
const logger = require("../logger");
const { Sequelize, sql } = require("sequelize");
const { format } = require("date-fns");
const { id } = require("date-fns/locale");

async function PedidoDtoById(id) {
  return await PedidoDtoModel.findByPk(id);
}

async function GetAll(where, order) {
  return await PedidoDtoModel.findAll({ where, order });
}

async function PorPedidoOrigem(parametros) {
  const aWhere = { pedidoorigem: parametros.pedidoOrigem };
  const aOrder = [
    ["status", "ASC"],
    ["emissao", "ASC"],
  ];
  return GetAll(aWhere, aOrder);
}

async function AnaliseDeVendas(parametros) {
  const aWhere = {
    idgrupo:
      parametros.idGrupo > 0 ? parametros.idGrupo : { [Sequelize.Op.gte]: 0 },
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
  };
  const aOrder = [
    ["nomecertificado", "ASC"],
    ["idcertificado", "ASC"],
    ["emissao", "ASC"],
  ];

  return GetAll(aWhere, aOrder);
}

async function PorTipoDePagamento(parametros) {
  const aWhere = {
    idtipopagamento:
      parametros.idTipoPagamento > 0
        ? parametros.idTipoPagamento
        : { [Sequelize.Op.gte]: 0 },
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
  };
  const aOrder = [
    ["idtipopagamento", "ASC"],
    ["emissao", "ASC"],
  ];

  return GetAll(aWhere, aOrder);
}

async function PorStatus(parametros) {
  const aWhere = {
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
  };
  const aOrder = [
    ["emissao", "ASC"],
    ["pedidoorigem", "ASC"],
  ];

  return GetAll(aWhere, aOrder);
}

async function PorEmissaoValidade(parametros) {
  const aWhere = {
    oc: parametros.oc === "" ? { [Sequelize.Op.ne]: null } : parametros.oc,
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
    idcertificado:
      parametros.idCertificado > 0
        ? parametros.idCertificado
        : { [Sequelize.Op.gte]: 0 },
    idmidia:
      parametros.idMidia > 0 ? parametros.idMidia : { [Sequelize.Op.gte]: 0 },
    idparceiro:
      parametros.idParceiro > 0
        ? parametros.idParceiro
        : { [Sequelize.Op.gte]: 0 },
    idagenteverificacao:
      parametros.idAgenteVerificacao > 0
        ? parametros.idAgenteVerificacao
        : { [Sequelize.Op.gte]: 0 },
    idponto:
      parametros.idPonto > 0 ? parametros.idPonto : { [Sequelize.Op.gte]: 0 },

    liberadofaturamento: parametros.liberadoFaturamento
      ? true
      : { [Sequelize.Op.or]: [true, false] },
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
    validade: {
      [Sequelize.Op.between]: [
        parametros.validadeInicial,
        parametros.validadeFinal,
      ],
    },
  };

  const aOrder = [
    ["emissao", "ASC"],
    ["pedidoorigem", "ASC"],
  ];
  return GetAll(aWhere, aOrder);
}

async function PorDataRenovacao(parametros) {
  const aWhere = {
    datarevogacao: null,
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
    idponto:
      parametros.idPonto > 0 ? parametros.idPonto : { [Sequelize.Op.gte]: 0 },
    pedidoorigem: parametros.ignoraNumerosIguais
      ? { [Sequelize.Op.ne]: Sequelize.col("pedidorenovacao") }
      : { [Sequelize.Op.ne]: null },
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
    datarenovacao: {
      [Sequelize.Op.between]: [
        parametros.renovacaoInicial,
        parametros.renovacaoFinal,
      ],
    },
    validade: {
      [Sequelize.Op.between]: [
        parametros.validadeInicial,
        parametros.validadeFinal,
      ],
    },
  };

  const aOrder = [
    ["validade", "ASC"],
    ["datarenovacao", "ASC"],
    ["nomecertificado", "ASC"],
    ["nomecliente", "ASC"],
  ];

  return GetAll(aWhere, aOrder);
}

module.exports = {
  PedidoDtoById,
  PorDataRenovacao,
  PorEmissaoValidade,
  PorPedidoOrigem,
  PorStatus,
  PorTipoDePagamento,
  AnaliseDeVendas,
};
