const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('perfis_permissoes', {
  id_pp: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_pp"
  },
  perfil_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "perfil_id"
  },
  permissao_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "permissao_id"
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
  tableName: "perfis_permissoes",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});