const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

const CategoriaMaterialLogistica = sequelize.define('categoria_material_logistica', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id"
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
    field: 'created_at',
    defaultValue: DataTypes.NOW,
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at',
    defaultValue: DataTypes.NOW,
  }
}, {
  tableName: "categoria_material_logistica",
});

module.exports = CategoriaMaterialLogistica;