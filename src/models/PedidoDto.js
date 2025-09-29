const { Sequelize, DataTypes } = require("sequelize");
const { Model } = require("sequelize");

class PedidoDto extends Model {
  static init(sequelize) {
    super.init(
      {
        id: { type: DataTypes.INTEGER, allowNull: true, primaryKey: true },

        datarenovacao: { type: DataTypes.DATE, allowNull: false },
        emissao: { type: DataTypes.DATE, allowNull: false },
        validade: { type: DataTypes.DATE, allowNull: false },
        dataenvioaviso: { type: DataTypes.DATE, allowNull: false },
        datapgtocomissao: { type: DataTypes.DATE, allowNull: false },
        emissaonota: { type: DataTypes.DATE, allowNull: false },
        datarevogacao: { type: DataTypes.DATE, allowNull: false },
        dataoc: { type: DataTypes.DATE, allowNull: false },

        idtipoemissao: { type: DataTypes.INTEGER, allowNull: true },
        valorcertificado: { type: DataTypes.FLOAT, allowNull: true },
        valormidia: { type: DataTypes.FLOAT, allowNull: true },
        valortotal: { type: DataTypes.FLOAT, allowNull: true },
        despesas: { type: DataTypes.FLOAT, allowNull: true },
        antecipacao: { type: DataTypes.FLOAT, allowNull: true },
        renovacaoprogramada: { type: DataTypes.BOOLEAN, allowNull: true },
        pedidorenovacao: { type: DataTypes.STRING, allowNull: true },

        // horafinalvalidade: { type: DataTypes.STRING, allowNull: true },
        // horainicialvalidade: { type: DataTypes.STRING, allowNull: true },

        idcertificado: { type: DataTypes.INTEGER, allowNull: true },
        idcliente: { type: DataTypes.INTEGER, allowNull: true },
        idnf: { type: DataTypes.INTEGER, allowNull: true },
        idmidia: { type: DataTypes.INTEGER, allowNull: true },
        idagentevalidacao: { type: DataTypes.INTEGER, allowNull: true },
        idagenteverificacao: { type: DataTypes.INTEGER, allowNull: true },
        idparceiro: { type: DataTypes.INTEGER, allowNull: true },
        idorigem: { type: DataTypes.INTEGER, allowNull: true },
        idponto: { type: DataTypes.INTEGER, allowNull: true },
        pedidoorigem: { type: DataTypes.STRING, allowNull: true },
        status: { type: DataTypes.STRING, allowNull: true },
        observacoes: { type: DataTypes.STRING, allowNull: true },

        idtipopagamento: { type: DataTypes.INTEGER, allowNull: true },
        liberadofaturamento: { type: DataTypes.BOOLEAN, allowNull: true },
        nomecliente: { type: DataTypes.STRING, allowNull: true },
        observacoescliente: { type: DataTypes.STRING, allowNull: true },
        nomeorigem: { type: DataTypes.STRING, allowNull: true },
        idtipocomissao: { type: DataTypes.INTEGER, allowNull: true },
        numeronota: { type: DataTypes.STRING, allowNull: true },
        nomeponto: { type: DataTypes.STRING, allowNull: true },
        comissaoponto: { type: DataTypes.FLOAT, allowNull: true },
        nomemidia: { type: DataTypes.STRING, allowNull: true },
        comissaomidia: { type: DataTypes.FLOAT, allowNull: true },
        pagacomissaoparceiro: { type: DataTypes.FLOAT, allowNull: true },
        parceiro_comissao: { type: DataTypes.FLOAT, allowNull: true },
        nomeparceiro: { type: DataTypes.STRING, allowNull: true },
        parceiro_nomecadastrado: { type: DataTypes.STRING, allowNull: true },
        contaparceiro: { type: DataTypes.STRING, allowNull: true },
        bancoparceiro: { type: DataTypes.STRING, allowNull: true },
        agenciaparceiro: { type: DataTypes.STRING, allowNull: true },
        idgrupo: { type: DataTypes.INTEGER, allowNull: true },
        certificado_comissao: { type: DataTypes.FLOAT, allowNull: true },
        comissaoapagarcertificado: { type: DataTypes.FLOAT, allowNull: true },
        nomegrupo: { type: DataTypes.STRING, allowNull: true },
        precocompra: { type: DataTypes.FLOAT, allowNull: true },
        comissaovalorcertificado: { type: DataTypes.FLOAT, allowNull: true },
        comissaopontocertificado: { type: DataTypes.FLOAT, allowNull: true },
        nomecertificado: { type: DataTypes.STRING, allowNull: true },
        nomeagentevalidacao: { type: DataTypes.STRING, allowNull: true },
        nomeagenteverificacao: { type: DataTypes.STRING, allowNull: true },
        parceiro_nometitularconta: { type: DataTypes.STRING, allowNull: true },
        semverificacaoaci: { type: DataTypes.BOOLEAN, allowNull: true },
        urlhope: { type: DataTypes.STRING, allowNull: true },
        qtdeparcelascartao: { type: DataTypes.INTEGER, allowNull: true },
        idmodelocertificado: { type: DataTypes.INTEGER, allowNull: true },
        oc: { type: DataTypes.STRING, allowNull: true },
        tipoultimoaviso: { type: DataTypes.STRING, allowNull: true },
        cpfresponsavel: { type: DataTypes.STRING, allowNull: true },
        contato_telefone: { type: DataTypes.STRING, allowNull: true },
        telefoneresponsavel: { type: DataTypes.STRING, allowNull: true },
      },
      {
        createdAt: false,
        // don't generate an "updatedAt" attribute
        updatedAt: false,
        sequelize,
        tableName: "PEDIDOSPROXY",
      }
    );
    return this;
  }
}

module.exports = PedidoDto;
