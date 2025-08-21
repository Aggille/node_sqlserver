async function solicitacaoPeriodoUso(req, res) {
  const {
    evento,
    protocolo,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    nomeTitular,
    cpfTitular,
    primeiraEmissao,
  } = req.body;

  return res
    .status(200)
    .json({ message: "Solicitação de período de uso realizada com sucesso" });
}

module.exports = {
  solicitacaoPeriodoUso,
};
