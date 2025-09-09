const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class Cliente extends Model {
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
        idparceiro: DataTypes.INTEGER,
        observacoes: DataTypes.STRING,
        endereco_logradouro: DataTypes.STRING,
        endereco_numero: DataTypes.STRING,
        endereco_bairro: DataTypes.STRING,
        endereco_complemento: DataTypes.STRING,
        endereco_cep: DataTypes.STRING,
        iduf: DataTypes.INTEGER,
        idcidade: DataTypes.INTEGER,
        idtipologradouro: DataTypes.INTEGER,
        contato_telefone: DataTypes.STRING,
        contato_fax: DataTypes.STRING,
        contato_email: DataTypes.STRING,
        contato_site: DataTypes.STRING,
        identificacao_tipopessoa: DataTypes.STRING,
        identificacao_cnpjcpf: DataTypes.STRING,
        identificacao_inscricaoestadual: DataTypes.STRING,
        identificacao_inscricaomunicipal: DataTypes.STRING,
        email_contador: DataTypes.STRING,
        cei: DataTypes.STRING,
        pis: DataTypes.STRING,
        aniversario: DataTypes.DATE,
        nomeresponsavel: DataTypes.STRING,
        emailresponsavel: DataTypes.STRING,
        cpfresponsavel: DataTypes.STRING,
        valorpago: DataTypes.DOUBLE,
        datanascimentoresponsavel: DataTypes.DATE,
        telefonersponsavel: DataTypes.STRING,
        notificacaowhatsapp: DataTypes.BOOLEAN,
        ecaepf: DataTypes.STRING,
        inativo: DataTypes.BOOLEAN,
      },
      {
        sequelize,
        tableName: "CLIENTES",
      }
    );
  }
}

module.exports = Cliente;
