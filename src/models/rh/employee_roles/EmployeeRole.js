const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionario_cargos', {
  id_fc: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  funcionario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'funcionarios',
      key: 'id_funcionario'
    }
  },
  cargo_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'cargos',
      key: 'id_cargo'
    }
  }
}, {
  tableName: "funcionario_cargos"
});

// Created by António Baptista #(24/08/2023)