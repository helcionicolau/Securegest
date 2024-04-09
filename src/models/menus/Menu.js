const { DataTypes } = require("sequelize");
const db = require("../../utils/sequelize");

const Menu = db.define('menus', {
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
  }
}, {
  tableName: "menus"
});

module.exports = Menu;
