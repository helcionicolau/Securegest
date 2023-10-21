const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('logistica', {
  id_logistica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_logistica"
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
  },
  referencia: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "referencia"
  },
  id_provedora: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_provedora"
  }
}, {
  tableName: "logistica"
});
