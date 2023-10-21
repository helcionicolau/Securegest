const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('zona', {
  id_zona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_zona"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_area"
  }
}, {
  tableName: "zona"
});
