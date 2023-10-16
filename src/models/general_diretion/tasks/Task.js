const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('tarefas', {
  id_tarefa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_tarefa"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    field: "descricao"
  },
  data_inicio: {
    type: DataTypes.DATE,
    field: "data_inicio"
  },
  data_fim_prevista: {
    type: DataTypes.DATE,
    field: "data_fim_prevista"
  },
  estado_tarefa: {
    type: DataTypes.ENUM('Pedido', 'Em Progresso', 'Feito'),
    allowNull: false,
    field: "estado_tarefa"
  },
  progresso: {
    type: DataTypes.STRING,
    field: "progresso"
  },
  id_projeto: {
    type: DataTypes.INTEGER,
    field: "id_projeto"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    field: "id_funcionario"
  },
}, {
  tableName: "tarefas"
});

// Created by António Baptista #(24/08/2023)