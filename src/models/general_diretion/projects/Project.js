const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('projetos', {
  id_projeto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_projeto"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  sumario: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sumario"
  },
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "data_inicio"
  },
  data_fim_prevista: {
    type: DataTypes.DATE,
    allowNull: true,
    field: "data_fim_prevista"
  },
  estado: {
    type: DataTypes.ENUM('Pedido', 'Em Progresso', 'Feito'),
    allowNull: false,
    field: "estado"
  },
  tipo_projeto: {
    type: DataTypes.ENUM('Interno', 'Externo'),
    allowNull: false,
    field: "tipo_projeto"
  },
  progresso: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "progresso"
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_cliente"
  },
  id_departamento: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id_departamento"
  }
}, {
  tableName: "projetos"
});

// Created by António Baptista #(24/08/2023)