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
  },
  longitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true,
    field: "longitude"
  },
  latitude: {
    type: DataTypes.DECIMAL(10, 6),
    allowNull: true,
    field: "latitude"
  }
}, {
  tableName: "area"
});
