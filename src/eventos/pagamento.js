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

  return res.status(200).json({ message: "Pagamento notificado com sucesso" });
}
module.exports = {
  pagamento,
};
