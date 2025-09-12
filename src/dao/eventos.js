const EventosModel = require("../models/Evento");
const logger = require("../logger");

async function EventoById(id) {
  return await EventosModel.findByPk(id);
}

async function UpdateEvento(evento) {
  await evento.save();
  //logger.info("Evento atualizado com sucesso ", evento.id);
}

async function InsertEvento(evento) {
  //logger.info("Inserindo evento ", evento);
  await evento.save();
  //logger.info("Evento inserido com sucesso ", evento.id);
}

module.exports = {
  EventoById,
  UpdateEvento,
  InsertEvento,
};
