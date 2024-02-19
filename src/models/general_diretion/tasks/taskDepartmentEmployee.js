const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('tarefa_departamento_funcionario', {
    id_tdf: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_tdf"
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
  id_tarefa: {
    type: DataTypes.INTEGER,
    field: "id_tarefa"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    field: "id_funcionario"
  },
}, {
  tableName: "tarefa_departamento_funcionario"
});
   
// Created by António Baptista #(24/08/2023)