const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('usuario_perfis', {
  id_up: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_up"
  },
  id_usuario: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_usuario"
  },
  id_perfil: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_perfil"
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
  tableName: "usuario_perfis",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
