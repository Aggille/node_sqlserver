async function emissao(req, res) {}

async function solicitacao(req, res) {}

async function validacao(req, res) {}

async function verificacao(req, res) {
  console.log(req.body);
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

  return res
    .status(200)
    .json({ message: "Verificação notificada com sucesso" });
}

module.exports = {
  emissao,
  solicitacao,
  validacao,
  verificacao,
};
