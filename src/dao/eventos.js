const EventosModel = require("../models/Evento");
const logger = require("../logger");
const dao = require("../dao/genericDao");

async function EventoById(id) {
  return await EventosModel.findByPk(id);
}

async function EventosByProtocoloTipoEvento(protocolo, tipoevento) {
  const aWhere = [{ protocolo: protocolo }, { tipoevento: tipoevento }];
  const aOrder = [["protocolo", "ASC"]];
  const eventos = await dao.FindAndCountAll(EventosModel, aWhere, aOrder, [
    "protocolo",
  ]);
  return eventos;
}

async function UpdateEvento(evento) {
  await evento.save();
}

async function InsertEventoWithMessage(evento, req, res) {
  const msg = `Pedido ${evento.protocolo}: Evento ${evento.tipoevento} realizado com sucesso`;
  await evento.save();
  logger.info(msg);
  res.status(200).json({ message: msg });
  return evento;
}

async function InsertEvento(evento) {
  await evento.save();
}

module.exports = {
  EventoById,
  UpdateEvento,
  InsertEvento,
  InsertEventoWithMessage,
  EventosByProtocoloTipoEvento,
};
