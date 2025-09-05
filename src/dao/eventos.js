const EventosModel = require("../models/Evento");

async function EventoById(id) {
  return await EventosModel.findByPk(id);
}

async function UpdateEvento(evento) {
  await evento.save();
  console.log("Evento atualizado com sucesso ", evento.id);
}

async function InsertEvento(evento) {
  console.log("Inserindo evento ", evento);
  await evento.save();
  console.log("Evento inserido com sucesso ", evento.id);
}

module.exports = {
  EventoById,
  UpdateEvento,
  InsertEvento,
};
