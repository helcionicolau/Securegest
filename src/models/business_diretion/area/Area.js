const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('area', {
  id_area: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_area"
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
  tableName: "area"
});
