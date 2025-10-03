const { PedidoByProtocoloWithMessage } = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

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

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);
  const dataEvento = dtHoraEvento.substring(0, 10);
  const horaEvento = dtHoraEvento.substring(11, 19);

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: dataEvento,
    horaevento: horaEvento,
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel);
}

module.exports = {
  cancelamentoSolicitacao,
};
