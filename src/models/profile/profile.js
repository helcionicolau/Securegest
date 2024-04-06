const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

module.exports = db.define('perfis', {
  id_perfil: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_perfil"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descricao: {
    type: DataTypes.STRING,
    allowNull: true
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
  tableName: "perfis",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});
