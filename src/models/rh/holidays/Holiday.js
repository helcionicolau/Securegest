const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('feriados', {
  id_feriado: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_feriado"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "data_inicio"
  },
  data_fim: {
    type: DataTypes.DATE,
    allowNull: false,
    field: "data_fim"
  },
  numero_de_dias: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "numero_de_dias"
  },
  ano: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "ano"
  },
}, {
  tableName: "feriados"
});

// Created by António Baptista #(24/08/2023)