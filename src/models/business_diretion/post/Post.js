const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('posto', {
  id_posto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_posto"
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
  id_zona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_zona"
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_cliente"
  },
  id_logistica: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_logistica"
  },
  n_operadores: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "n_operadores"
  },
  provincia: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "provincia"
  },
  municipio: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "municipio"
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "latitude"
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "longitude"
  }
}, {
  tableName: "posto"
});
