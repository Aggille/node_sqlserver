const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");
const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");

async function validacao(req, res) {
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    validacaoExterna,
    localAtendimento,
    dtLimiteVerificacao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    comVerificacao,
    tipoMatch,
    apelidoPosto,
    tipoEmissao,
  } = req.body;

  // pesquisa certificado
  // responvaleEvento nome:cpf - pesquisar o cpf -= jogar em Agende de Validação
  // marcar validação externa :validadeExterna
  // criar campo data de validação com a data do evento

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return { status: 404, message: "Pedido não encontrado" };
  }

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

  await InsertEvento(eventoModel);

  return res.status(200).json({ message: "Validação notificada com sucesso" });
}

module.exports = {
  validacao,
};
