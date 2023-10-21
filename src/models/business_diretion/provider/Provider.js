const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('provedora', {
  id_provedora: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_provedora"
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
  }
}, {
  tableName: "provedora"
});
