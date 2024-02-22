const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('posto', {
  id_posto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_posto"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_posicao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_posicao"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_funcionario"
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
