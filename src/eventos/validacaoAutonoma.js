const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function validacaoAutonoma(req, res) {
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

  pedido.datavalidacao = dtHoraEvento;
  await UpdatePedido(pedido);

  const horaEvento = dtHoraEvento.substring(11, 19);
  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dtHoraEvento.substring(0, 10),
    horaevento: horaEvento,
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  validacaoAutonoma,
};
