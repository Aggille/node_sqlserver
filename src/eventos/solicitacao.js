async function solicitacao(req, res) {
  console.log(req.body);
  const {
    protocolo,
    evento,
    protocoloRenovacao,
    certificadoTipo,
    nomeRazaoSocial,
    documento,
    nomeAutoridadeRegistro,
    cnpjAutoridadeRegistro,
    cpfTitular,
    nomeTitular,
    dtNascimentoTitular,
    numeroTitular,
    logradouroTitular,
    complementoTitular,
    bairroTitular,
    cepTitular,
    nomeMunicipioTitular,
    siglaUFTitular,
    email,
    telefone,
    parametro1,
    parametro2,
    parametro3,
    parametro4,
    parametro5,
    parametro6,
    parametro7,
    parametro8,
    parametro9,
    parametro10,
    parametro11,
    parametro12,
    parametro13,
    parametro14,
    parametro15,
    parametro16,
    parametro17,
    parametro18,
    parametro19,
    parametro20,
    parametro21,
    parametro22,
    parametro23,
    parametro24,
    parametro25,
    produtoId,
    produtoValor,
    produtoDescricao,
    dtHoraEvento,
  } = req.body;

  return res
    .status(200)
    .json({ message: "Solicitação notificada com sucesso" });
}

module.exports = {
  solicitacao,
};
