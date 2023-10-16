const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionarios', {
  id_funcionario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_funcionario"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "sexo"
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "estado_civil"
  },
  data_nascimento: {
    type: DataTypes.DATE,
    field: "data_nascimento"
  },
  nif: {
    type: DataTypes.STRING,
    field: "nif"
  },
  cargo: {
    type: DataTypes.STRING,
    field: "cargo"
  },
  data_contratacao: {
    type: DataTypes.DATE,
    field: "data_contratacao"
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    field: "salario"
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "departamento_id"
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "data_registro"
  },
  carga_horaria_diaria: {
    type: DataTypes.TIME,
    allowNull: true,
    field: "carga_horaria_diaria"
  },
}, {
  tableName: "funcionarios"
});

// Created by António Baptista #(24/08/2023)