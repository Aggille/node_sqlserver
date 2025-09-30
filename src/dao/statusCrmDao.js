const StatusCrmDto = require("../models/StatusCrmDto");

function AllStatusCrm() {
  const lista = [];
  lista.push(new StatusCrmDto(0, "Perdido", "Maroon"));
  lista.push(new StatusCrmDto(1, "Renovado", "Green"));
  lista.push(new StatusCrmDto(2, "Contato", "Orange"));
  lista.push(new StatusCrmDto(3, "Agendado", "Blue"));
  lista.push(new StatusCrmDto(4, "Aguardando", "Purple"));
  lista.push(new StatusCrmDto(5, "Concorrente", "Pink"));
  lista.push(new StatusCrmDto(6, "Suporte", "Gray"));
  lista.push(new StatusCrmDto(7, "Não Contatado", "Red"));
  lista.push(new StatusCrmDto(8, "Desistiu", "Peru"));
  lista.push(new StatusCrmDto(9, "Notificado", "Silver"));
  lista.push(new StatusCrmDto(10, "Protocolo de Entrega", "Teal"));
  lista.push(new StatusCrmDto(11, "Observações", "Violet"));

  return lista;
}

function getStatusCrmById(id) {
  const lista = AllStatusCrm();
  return lista.find((item) => item.id === id) || null;
}

module.exports = { AllStatusCrm, getStatusCrmById };
