const { Model } = require("sequelize");

class GenericDao {
  static async Insert(model) {
    await model.save();
  }

  static async Update(model) {
    await model.save();
  }

  static async Delete(model) {
    await model.destroy();
  }

  static async FindByPk(model, id) {
    return await model.findByPk(id);
  }

  static async FindOne(model, where) {
    return await model.findOne(where);
  }

  static async FindAll(model, where, order) {
    return await model.findAll({ where, order });
  }
}

module.exports = GenericDao;
