const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('logistica', {
  id_logistica: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_logistica"
  },
  material: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "material"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_provedora: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_provedora"
  },
  id_posicao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_posicao"
  }
}, {
  tableName: "logistica"
});