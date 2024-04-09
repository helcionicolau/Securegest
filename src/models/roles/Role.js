const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Role = require( "../rh/roles/Role" );

Role = db.define('roles', {
  id_role: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_role"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "descricao"
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
  tableName: "roles",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Role;