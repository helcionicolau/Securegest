const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");

const CategoriaMaterialLogistica = sequelize.define('categoria_material_logistica', {
  id_ps: {
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
    field: 'created_at'
  },
  updated_at: {
    type: DataTypes.DATE,
    field: 'updated_at'
  }
}, {
  tableName: "categoria_material_logistica",
});

module.exports = CategoriaMaterialLogistica;