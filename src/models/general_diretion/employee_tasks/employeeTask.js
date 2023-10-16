const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionario_tarefas', {
  id_ft: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_ft"
  },
  tarefa: {
    type: DataTypes.TEXT,
    field: "tarefa"
  },
  data_associacao: {
    type: DataTypes.DATE,
    field: "data_associacao"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    field: "id_funcionario"
  },
  id_tarefa: {
    type: DataTypes.INTEGER,
    field: "id_tarefa"
  },
}, {
  tableName: "funcionario_tarefas"
});

// Created by António Baptista #(24/08/2023)