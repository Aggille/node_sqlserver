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

  // CRIAR UM CAMPO DATA DE CONFIRMAAÇÃO
  // E ATUALIZAR NESSE EVENTO

  return res
    .status(200)
    .json({ message: "Confirmação de cadastro realizada com sucesso" });
}
module.exports = {
  confirmacaoCadastro,
};
