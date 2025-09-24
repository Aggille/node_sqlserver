const { PedidoByProtocolo, UpdatePedido } = require("../dao/pedidos");

async function pagamento(req, res) {
  const {
    formaPagamento,
    statusPagamento,
    valorPagamento,
    voucherCodigo,
    voucherValor,
    voucherPercentual,
    bairro,
    cep,
    cidade,
    cidadeCodigo,
    complemento,
    documento,
    email1,
    email2,
    ie,
    endereco,
    numero,
    sacado,
    uf,
    ufCodigo,
    pais,
    paisCodigoAlpha3,
    dtHoraEvento,
  } = req.body;

  const msg = `Pedido ${protocolo}: Evento ${evento} realizado com sucesso`;
  return res.status(200).json({ message: msg });
}
module.exports = {
  pagamento,
};
