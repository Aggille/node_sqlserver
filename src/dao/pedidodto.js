const PedidoDtoModel = require("../models/PedidoDto");
const logger = require("../logger");
const { Sequelize, sql } = require("sequelize");
const { format } = require("date-fns");
const { id } = require("date-fns/locale");
const dao = require("../dao/genericDao");

async function PedidoDtoById(id) {
  return await PedidoDtoModel.findByPk(id);
}

async function GetAll(where, order) {
  return await dao.FindAll(PedidoDtoModel, where, order);
}

async function PorPedidoOrigem(parametros) {
  const aWhere = { pedidoorigem: parametros.pedidoOrigem };
  const aOrder = [
    ["status", "ASC"],
    ["emissao", "ASC"],
  ];
  return GetAll(aWhere, aOrder);
}

async function PedidosAVencerSemRenovacoes(parametros) {
  const aWhere = {
    [Sequelize.Op.and]: [
      Sequelize.literal("coalesce( PEDIDORENOVACAO,'' ) <> ''"),
    ],
    validade: {
      [Sequelize.Op.between]: [
        parametros.validadeInicial,
        parametros.validadeFinal,
      ],
    },
    idparceiro:
      parametros.idParceiro > 0
        ? parametros.idParceiro
        : { [Sequelize.Op.gte]: 0 },
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
  };
  const aOrder = [
    ["emissao", "ASC"],
    ["pedidoorigem", "ASC"],
  ];

  return GetAll(aWhere, aOrder);
}

async function PedidosAVencer(parametros) {
  const aWhere = {
    validade: {
      [Sequelize.Op.between]: [
        parametros.validadeInicial,
        parametros.validadeFinal,
      ],
    },
    status:
      parametros.status > 0 ? parametros.status : { [Sequelize.Op.ne]: 3 },
    idparceiro:
      parametros.idParceiro > 0
        ? parametros.idParceiro
        : { [Sequelize.Op.gte]: 0 },
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
    pedidorenovacao: {
      [Sequelize.Op.or]: [
        "",
        { [Sequelize.Op.eq]: Sequelize.col("pedidoorigem") },
      ],
    },
  };
  const aOrder = [
    ["validade", "ASC"],
    ["pedidoorigem", "ASC"],
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

async function PedidosPorCliente(parametros) {
  const aWhere = {
    idcliente: parametros.idCliente,
  };

  const aOrder = [["idorigem", "ASC"]];

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

async function PedidosANotificar(parametros) {
  let w = "";

  if (parametros.statusNotificacao && parametros.statusNotificacao >= 0) {
    if (parametros.statusNotificacao === "9") {
      w = "DataEnvioAviso is null";
    } else {
      w = `TipoUltimoAviso=${parametros.statusNotificacao} and DataEnvioAviso is not null`;
    }
  }

  const aWhere = {
    [Sequelize.Op.and]: [Sequelize.literal(w)],
    status:
      parametros.status > 0
        ? parametros.status
        : {
            [Sequelize.Op.and]: [
              { [Sequelize.Op.lt]: 99 },
              { [Sequelize.Op.ne]: 3 },
            ],
          },

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
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
  };
  const aOrder = [
    ["validade", "ASC"],
    ["pedidoorigem", "ASC"],
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

async function Gerencial(parametros) {
  const aWhere = {
    idcliente:
      parametros.idCliente > 0
        ? parametros.idCliente
        : { [Sequelize.Op.gte]: 0 },
    idorigem:
      parametros.idorigem > 0 ? parametros.idOrigem : { [Sequelize.Op.gte]: 0 },
    idmidia:
      parametros.idMidia > 0 ? parametros.idMidia : { [Sequelize.Op.gte]: 0 },
    idparceiro:
      parametros.idParceiro > 0
        ? parametros.idParceiro
        : { [Sequelize.Op.gte]: 0 },
    idponto:
      parametros.idPonto > 0 ? parametros.idPonto : { [Sequelize.Op.gte]: 0 },
    emissao: {
      [Sequelize.Op.between]: [
        parametros.emissaoInicial,
        parametros.emissaoFinal,
      ],
    },
  };

  const aOrder = [["idorigem", "ASC"]];
  return GetAll(aWhere, aOrder);
}

async function PorPagamentoComissao(parametros) {
  const aWhere = {
    idparceiro:
      parametros.idParceiro > 0
        ? parametros.idParceiro
        : { [Sequelize.Op.gte]: 0 },
    idponto:
      parametros.idPonto > 0 ? parametros.idPonto : { [Sequelize.Op.gte]: 0 },
    datapgtocomissao: {
      [Sequelize.Op.between]: [parametros.dataInicial, parametros.dataFinal],
    },
  };

  const aOrder = [
    ["nomeparceiro", "ASC"],
    ["idparceiro", "ASC"],
  ];
  return GetAll(aWhere, aOrder);
}

async function PorEmissao(parametros) {
  const aWhere = {
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
    idponto:
      parametros.idPonto > 0 ? parametros.idPonto : { [Sequelize.Op.gte]: 0 },

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

module.exports = {
  PedidoDtoById,
  PorDataRenovacao,
  PorEmissaoValidade,
  PorPedidoOrigem,
  PorStatus,
  PorTipoDePagamento,
  AnaliseDeVendas,
  PedidosAVencer,
  PedidosANotificar,
  PedidosAVencerSemRenovacoes,
  PedidosPorCliente,
  Gerencial,
  PorPagamentoComissao,
  PorEmissao,
};
