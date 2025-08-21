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

  return res
    .status(200)
    .json({ message: "Confirmação de cadastro realizada com sucesso" });
}
module.exports = {
  confirmacaoCadastro,
};
