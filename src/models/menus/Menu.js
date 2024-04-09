const db = require("../../utils/sequelize");
const { DataTypes } = require("sequelize");

Menu = db.define('menus', {
  id_menu: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_menu"
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
  tableName: "menus",
  timestamps: true, // Habilita o uso dos timestamps automáticos
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});


module.exports = Menu;