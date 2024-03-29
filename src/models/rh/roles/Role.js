const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('cargos', {
  id_cargo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_cargo"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  }
}, {
  tableName: "cargos"
});
