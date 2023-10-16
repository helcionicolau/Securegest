const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('funcionario_ferias', {
  id_feria: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_feria"
  },
  id_funcionario: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id_funcionario"
  },
  tipo_ferias: {
    type: DataTypes.ENUM('Anual', 'Mensal', 'Semestral', 'Bimestral', 'Trimestral', 'Outro'),
    allowNull: false,
    field: "tipo_ferias"
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
  observacoes: {
    type: DataTypes.TEXT,
    field: "observacoes"
  },
  data_solicitacao: {
    type: DataTypes.DATE,
    field: "data_solicitacao"
  },
  data_aprovacao: {
    type: DataTypes.DATE,
    field: "data_aprovacao"
  },
  data_conclusao: {
    type: DataTypes.DATE,
    field: "data_conclusao"
  },
  status: {
    type: DataTypes.ENUM('Solicitado', 'Aprovado', 'Concluído', 'Cancelado', 'Outro'),
    field: "status"
  },
  contato_emergencia: {
    type: DataTypes.STRING(100),
    field: "contato_emergencia"
  },
  saldo_atual: {
    type: DataTypes.INTEGER,
    field: "saldo_atual"
  }
}, {
  tableName: "funcionario_ferias"
});


// Created by António Baptista #(24/08/2023)