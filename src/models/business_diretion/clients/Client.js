const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('clientes', {
  id_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_cliente"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  endereco: {
    type: DataTypes.STRING,
    field: "endereco"
  },
  info_contato: {
    type: DataTypes.STRING,
    field: "info_contato"
  },
}, {
  tableName: "clientes"
});

// Created by António Baptista #(24/08/2023)