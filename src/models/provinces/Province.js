// models/Provincia.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");

const Provincia = sequelize.define('provincia', {
  id_provincia: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_provincia"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "name"
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sigla"
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: "provincias",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Provincia;