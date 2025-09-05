const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");
const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");

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

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return res.status(404).json({ message: "Pedido não encontrado" });
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

  return res
    .status(200)
    .json({ message: "Validação autônoma realizada com sucesso" });
}

module.exports = {
  validacaoAutonoma,
};
