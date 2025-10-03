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

  const dataEvento = dtHoraEvento.substring(0, 10);
  const horaEvento = dtHoraEvento.substring(11, 19);

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  if (!pedido) {
    return;
  }

  await UpdatePedido(pedido);

  const eventoModel = new Evento({
    idpedido: pedido.id,
    tipoevento: evento,
    protocolo: protocolo,
    dataevento: dataEvento,
    horaevento: horaEvento,
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEventoWithMessage(eventoModel, req, res);
}

module.exports = {
  validacaoAutonoma,
};
