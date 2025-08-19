const Sequelize = require("sequelize");
const databaseConfig = require("../configs/db");
const Users = require("../models/User");

const models = [Users];

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
