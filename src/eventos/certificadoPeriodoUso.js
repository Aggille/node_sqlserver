async function certificadoPeriodoUso(req, res) {
  const { evento, protocolo, dtInicioPeriodo, dtFimPeriodo } = req.body;

  const pedido = await PedidoByProtocolo(protocolo);

  if (!pedido) {
    const msg = `${evento}: Pedido ${protocolo} não encontrado`;
    logger.error(msg);
    return res.status(404).json({ message: msg });
  }

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    tipoevento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEvento(eventoModel);
  const msg = `Pedido ${protocolo}: Evento ${evento} realizado com sucesso`;
  return res.status(200).json({ message: msg });
}

module.exports = {
  certificadoPeriodoUso,
};
