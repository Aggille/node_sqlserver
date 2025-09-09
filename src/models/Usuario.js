const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class Usuario extends Model {
  static init(sequelize) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: true,
          primaryKey: true,
          autoIncrement: true,
        },
        nome: DataTypes.STRING,
        login: DataTypes.STRING,
        senha: DataTypes.STRING,
        nivel: DataTypes.INTEGER,
        validade: DataTypes.DATE,
        exibecertificadosinicio: DataTypes.BOOLEAN,
        agendatrancada: DataTypes.BOOLEAN,
        idponto: DataTypes.INTEGER,
        idusuarioinclusao: DataTypes.INTEGER,
        cpf: DataTypes.STRING,
        skin: DataTypes.STRING,
        inativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "USUARIOS",
      }
    );
  }
}

module.exports = Usuario;
