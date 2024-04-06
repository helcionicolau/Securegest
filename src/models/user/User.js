const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('usuarios', {
  id_usuario: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_usuario"
  },
  nome_usuario: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "nome_usuario"
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    field: "email"
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "senha"
  },
  is_active: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "is_active"
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true,
    field: "telefone"
  },
  created_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'updated_at'
  }
}, {
  tableName: "usuarios",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Created by António Baptista #(24/08/2023)