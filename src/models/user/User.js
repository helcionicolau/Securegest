const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('users', {
  id_usuario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
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
    field: "email"
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "senha"
  },
  isactive: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "isactive"
  },
  role_id: {
    type: DataTypes.BIGINT,
    allowNull: true,
    references: {
      model: 'roles',
      key: 'id_role'
    },
    field: "role_id"
  },
  telefone: {
    type: DataTypes.STRING,
    allowNull: true,
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
  tableName: "users",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


// Created by António Baptista #(24/08/2023)