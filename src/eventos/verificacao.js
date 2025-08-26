const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");
const { format } = require("date-fns");
async function verificacao(req, res) {
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    acao,
    motivoRecusa,
    dtAcao,
    dtAberturaProtocolo,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    razaoSocialPosto,
    apelidoPosto,
  } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    return { status: 404, message: "Pedido não encontrado" };
  }

  const obs = `Verificação notificada em ${format(
    new Date(),
    "dd/MM/yyyy"
  )} via API\n${pedido.observacoes ?? ""}`;

  const dataVerificacao = dtHoraEvento;
  pedido.dataverificacao = dataVerificacao;
  pedido.observacoes = obs;
  pedido.status = 1; // pendente
  await UpdatePedido(pedido);

  return res
    .status(200)
    .json({ message: "Verificação notificada com sucesso" });
}

module.exports = {
  verificacao,
};
