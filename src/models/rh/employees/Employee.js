const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionarios', {
  id_funcionario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_funcionario"
  },
  n_mec: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "n_mec"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sexo"
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "estado_civil"
  },
  data_nascimento: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "data_nascimento"
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nif"
  },
  data_contratacao: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "data_contratacao"
  },
  salario: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
    field: "salario"
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "departamento_id"
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
    field: "data_registro"
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: true,
    field: "data_atualizacao"
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