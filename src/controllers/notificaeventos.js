const PedidosModel = require("../models/Pedido");
const op = require("sequelize");

async function emissao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    inicioValidade,
    fimValidade,
    numeroSerie,
    tipoEmissao,
  } = req.body;
  return res.status(200).json({ message: "Emissão notificada com sucesso" });
}

async function solicitacao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    protocoloRenovacao,
    certificadoTipo,
    nomeRazaoSocial,
    documento,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    cpfTitular,
    nomeTitular,
    dtNascimentoTitular,
    numeroTitular,
    logradouroTitular,
    complementoTitular,
    bairroTitular,
    cepTitular,
    nomeMunicipioTitular,
    siglaUFTitular,
    email,
    telefone,
    parametro1,
    parametro2,
    parametro3,
    parametro4,
    parametro5,
    parametro6,
    parametro7,
    parametro8,
    parametro9,
    parametro10,
    parametro11,
    parametro12,
    parametro13,
    parametro14,
    parametro15,
    parametro16,
    parametro17,
    parametro18,
    parametro19,
    parametro20,
    parametro21,
    parametro22,
    parametro23,
    parametro24,
    parametro25,
    produtoId,
    produtoValor,
    produtoDescricao,
    dtHoraEvento,
  } = req.body;

  return res
    .status(200)
    .json({ message: "Solicitação notificada com sucesso" });
}

async function validacao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    validadeExterna,
    localAtendimento,
    dtLimiteVerificacao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    comVerificacao,
    tipoMatch,
    apelidoPosto,
    tipoEmissao,
  } = req.body;

  return res.status(200).json({ message: "Validação notificada com sucesso" });
}

async function verificacao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    acao,
    motivoRecusa,
    dtAcao,
    dtAberturaProtocolo,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    razaoSocialPosto,
    apelidoPosto,
  } = req.body;

  return res
    .status(200)
    .json({ message: "Verificação notificada com sucesso" });
}

module.exports = {
  emissao,
  solicitacao,
  validacao,
  verificacao,
};
