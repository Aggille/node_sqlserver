const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");
const { FormatarCnpjCpf } = require("../utils/masks");
//const moment = require("moment");

class CrmDto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true },
        data: {
          type: DataTypes.DATEONLY,
          allowNull: false,
        },
        pedidovencimento: {
          type: DataTypes.DATEONLY,
          allowNull: false,
          field: "pedidos_vencimento",
        },

        statusnome: {
          type: DataTypes.VIRTUAL,
        },
        idcliente: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: false,
        },
        idusuario: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: false,
        },
        idstatus: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: false,
        },
        protocolo: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        tipocontato: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: false,
        },
        contato: { type: DataTypes.STRING, allowNull: true, primaryKey: false },
        conteudo: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        clientenome: {
          field: "cliente_nome",
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        clientetelefone: {
          field: "cliente_telefone",
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        usuarionome: {
          field: "usuario_nome",
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        pedidoprotocolorenovacao: {
          field: "pedidos_pedidorenovacao",
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        cliente_cnpjcpf: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        cliente_cnpjcpf_formatado: {
          type: DataTypes.VIRTUAL,
          get() {
            return FormatarCnpjCpf(this.cliente_cnpjcpf);
          },
        },
      },
      {
        createdAt: false,
        // don't generate an "updatedAt" attribute
        updatedAt: false,
        sequelize,
        timestamps: false,

        tableName: "CRMPROXY",
      }
    );
    return this;
  }
}

module.exports = CrmDto;
