const EventosModel = require("../models/Evento");
const logger = require("../logger");
const dao = require("../dao/genericDao");

async function EventoById(id) {
  return await EventosModel.findByPk(id);
}

async function UpdateEvento(evento) {
  try {
    await dao.Update(evento);
  } catch (err) {
    logger.error(
      `Erro na atualização do evento ${evento.tipoevento}:${evento.protocolo}`
    );
  }
}

async function InsertEventoWithMessage(evento, req, res) {
  try {
    await dao.Insert(evento);
    const msg = `Pedido ${evento.protocolo}: Evento ${evento.tipoevento} realizado com sucesso`;
    logger.info(msg);
    return res.status(200).json({ message: msg });
  } catch (err) {
    const msg = `Erro na inclusão do evento ${evento.tipoevento}:${evento.protocolo}`;
    logger.error(msg);
    return res.status(500).json({ message: msg });
  }
}

async function InsertEvento(evento) {
  try {
    await dao.Update(evento);
  } catch (err) {
    logger.error(
      `Erro na inclusão do evento ${evento.tipoevento}:${evento.protocolo}`
    );
  }
}

module.exports = {
  EventoById,
  UpdateEvento,
  InsertEvento,
  InsertEventoWithMessage,
};
