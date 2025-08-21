async function validacao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    dtHoraEvento,
    responsavelEvento,
    validadeExterna,
    localAtendimento,
    dtLimiteVerificacao,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    comVerificacao,
    tipoMatch,
    apelidoPosto,
    tipoEmissao,
  } = req.body;

  return res.status(200).json({ message: "Validação notificada com sucesso" });
}

module.exports = {
  validacao,
};
