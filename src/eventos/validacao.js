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

  return res.status(200).json({ message: "Validação notificada com sucesso" });
}

module.exports = {
  validacao,
};
