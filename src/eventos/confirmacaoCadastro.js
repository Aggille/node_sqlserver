const { PedidoByProtocolo } = require("../dao/pedidos");
const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

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
    return res.status(404).json({ message: "Pedido não encontrado" });
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

  return res
    .status(200)
    .json({ message: "Confirmação de cadastro realizada com sucesso" });
}
module.exports = {
  confirmacaoCadastro,
};
