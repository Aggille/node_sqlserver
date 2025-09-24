const {
  PedidoByProtocoloWithMessage,
  UpdatePedido,
} = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function solicitacao(req, res) {
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

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  pedido.datasolicitacao = new Date();
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

  await InsertEventoWithMessage(eventoModel);
}

module.exports = {
  solicitacao,
};
