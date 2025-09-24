const {
  PedidoByProtocolo,
  PedidoByProtocoloWithMessage,
} = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEventoWithMessage } = require("../dao/eventos");
const logger = require("../logger");

async function confirmacaoCadastro(req, res) {
  const {
    evento,
    protocolo,
    responsavelEvento,
    acao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    apelidoPosto,
    tipoMatch,
    comVerificacao,
    descricao,
  } = req.body;

  const pedido = await PedidoByProtocoloWithMessage(protocolo, req, res);

  const eventoModel = new Evento({
    idpedido: pedido.id,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  // CRIAR UM CAMPO DATA DE CONFIRMACAÇÃO
  // E ATUALIZAR NESSE EVENTO
  await InsertEventoWithMessage(eventoModel, req, res);
}
module.exports = {
  confirmacaoCadastro,
};
