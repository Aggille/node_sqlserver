async function certificadoPeriodoUso(req, res) {
  const { evento, protocolo, dtInicioPeriodo, dtFimPeriodo } = req.body;

  return res
    .status(200)
    .json({ message: "Certificado de período de uso emitido com sucesso" });
}

module.exports = {
  certificadoPeriodoUso,
};
