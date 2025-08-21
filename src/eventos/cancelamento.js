async function cancelamento(req, res) {
  const { protocolo, evento, dtHoraEvento, responsavelEvento } = req.body;

  return res
    .status(200)
    .json({ message: "Cancelamento notificado com sucesso" });
}

module.exports = {
  cancelamento,
};
