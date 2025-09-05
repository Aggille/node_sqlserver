const Evento = require("../models/Evento");
const { InsertEvento } = require("../dao/eventos");

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

  const eventoModel = new Evento({
    idpedido: 0,
    protocolo: protocolo,
    dataevento: new Date(),
    horaevento: new Date().toTimeString().substring(0, 8),
    evento: evento,
    jsonevento: JSON.stringify(req.body),
  });

  await InsertEvento(eventoModel);

  return res
    .status(200)
    .json({ message: "Solicitação de período de uso realizada com sucesso" });
}

module.exports = {
  solicitacaoPeriodoUso,
};
