const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('posicao', {
  id_posicao: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_posicao"
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
  n_postos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "n_postos"
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
  tableName: "posicao"
});