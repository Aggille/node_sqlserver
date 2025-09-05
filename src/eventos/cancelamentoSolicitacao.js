const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

async function cancelamentoSolicitacao(req, res) {
  const {
    protocolo,
    evento,
    dtHoraEvento,
    dtLimiteVerificacao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    documento,
    nomeRazaoSocial,
    numeroTitular,
    logradouroTitular,
    complementoTitular,
    bairroTitular,
    cepTitular,
    nomeMunicipioTitular,
    siglaUFTitular,
    email,
    telefone,
    validacaoExterna,
    comVerificacao,
  } = req.body;

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEvento(eventoModel);

  // Aqui você pode adicionar a lógica para processar o evento com verificação
  return res.status(200).json({
    message: "Cancelamento de solicitação processado com sucesso",
  });
}

module.exports = {
  cancelamentoSolicitacao,
};
