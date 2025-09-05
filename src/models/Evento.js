const { DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class Evento extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        idpedido: { type: DataTypes.INTEGER, allowNull: true },
        protocolo: { type: DataTypes.STRING, allowNull: true },
        dataevento: { type: DataTypes.DATE, allowNull: true },
        horaevento: { type: DataTypes.STRING, allowNull: true },
        tipoevento: { type: DataTypes.STRING, allowNull: true },
        jsonevento: { type: DataTypes.STRING, allowNull: true },
      },
      {
        createdAt: false,
        updatedAt: false,
        sequelize,
        tableName: "EVENTOS",
      }
    );
    return this;
  }
}

module.exports = Evento;
