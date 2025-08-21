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

  return res
    .status(200)
    .json({ message: "Validação autônoma realizada com sucesso" });
}

module.exports = {
  validacaoAutonoma,
};
