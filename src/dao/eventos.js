const EventosModel = require("../models/Evento");
const logger = require("../logger");

async function EventoById(id) {
  return await EventosModel.findByPk(id);
}

async function UpdateEvento(evento) {
  await evento.save();
}

async function InsertEventoWithMessage(evento, req, res) {
  console.log("Evento Incluido", evento);
  const msg = `Pedido ${evento.protocolo}: Evento ${evento.tipoevento} realizado com sucesso`;
  await evento.save();
  logger.info(msg);
  return res.status(200).json({ message: msg });
}

async function InsertEvento(evento) {
  await evento.save();
}

module.exports = {
  EventoById,
  UpdateEvento,
  InsertEvento,
  InsertEventoWithMessage,
};
