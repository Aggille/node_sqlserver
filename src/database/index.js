const Sequelize = require("sequelize");
const databaseConfig = require("../configs/db");
const Users = require("../models/User");
const PedidoDto = require("../models/PedidoDto");
const Pedido = require("../models/Pedido");
const Evento = require("../models/Evento");

const models = [Users, PedidoDto, Pedido, Evento];

class Database {
  constructor() {
    this.init();
  }
  init() {
    this.connection = new Sequelize(databaseConfig);
    models.forEach((model) => model.init(this.connection));
  }
}
module.exports = new Database();
