const { PedidoByProtocolo } = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");
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

  const pedido = await PedidoByProtocolo(protocolo);
  if (!pedido) {
    const msg = `${evento}: Pedido ${protocolo} não encontrado`;
    logger.error(msg);
    return res.status(404).json({ message: msg });
  }

  const eventoModel = new Evento({
    idpedido: pedido.id,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEvento(eventoModel);

  // CRIAR UM CAMPO DATA DE CONFIRMACAÇÃO
  // E ATUALIZAR NESSE EVENTO
  const msg = `Pedido ${protocolo}: Evento ${evento} realizado com sucesso`;

  return res.status(200).json({ message: msg });
}
module.exports = {
  confirmacaoCadastro,
};
