const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('tipo_saidas', {
  id_tipo: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_tipo"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  dia_saida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "dia_saida"
  },
  status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
    field: "status"
  },
}, {
  tableName: "tipo_saidas"
});

// Created by António Baptista #(24/08/2023)