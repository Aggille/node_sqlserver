const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class CrmDto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true },
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
        data: { type: DataTypes.DATE, allowNull: false },
        pedidos_vencimento: { type: DataTypes.DATE, allowNull: false },
        tipocontato: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: false,
        },
        contato: { type: DataTypes.STRING, allowNull: true, primaryKey: false },
        cliente_nome: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        cliente_telefone: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        usuario_nome: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        pedidos_pedidorenovacao: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
        cliente_cnpjcpf: {
          type: DataTypes.STRING,
          allowNull: true,
          primaryKey: false,
        },
      },
      {
        createdAt: false,
        // don't generate an "updatedAt" attribute
        updatedAt: false,
        sequelize,
        tableName: "CRMPROXY",
      }
    );
    return this;
  }
}

module.exports = CrmDto;
