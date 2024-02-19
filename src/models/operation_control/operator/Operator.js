const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('operadores', {
  id_operador: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_operador"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_funcionario"
  }
}, {
  tableName: "operadores"
});