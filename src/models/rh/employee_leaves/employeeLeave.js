const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionario_saidas', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id_funcionario"
  },
  id_tipo_saida: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id_tipo_saida"
  },
  tipo_saida: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "tipo_saida"
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
  duracao_saida: {
    type: DataTypes.INTEGER,
    field: "duracao_saida"
  },
  data_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "data_registro"
  },
  motivo: {
    type: DataTypes.TEXT,
    field: "motivo"
  },
  status_saida: {
    type: DataTypes.ENUM('Aprovado', 'Rejeitado', 'Não Aprovado'),
    allowNull: false,
    field: "status_saida"
  },
}, {
  tableName: "funcionario_saidas"
});

// Created by António Baptista #(24/08/2023)