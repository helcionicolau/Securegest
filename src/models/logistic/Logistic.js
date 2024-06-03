const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const CategoriaMaterialLogistica = require("./category/Category");
const Provedora = require("../business_diretion/provider/Provider");


const Logistica = sequelize.define('logistica', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id"
  },
  material: {
    type: DataTypes.STRING,
    defaultValue: null,
    field: "material"
  },
  descricao: {
    type: DataTypes.STRING,
    defaultValue: null,
    field: "descricao"
  },
  n_materiais: {
    type: DataTypes.INTEGER,
    defaultValue: 1,
    field: "n_materiais"
  },
  data_aquisicao: {
    type: DataTypes.DATE,
    defaultValue: null,
    field: "data_aquisicao"
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: CategoriaMaterialLogistica,
      key: 'id'
    },
    field: "id_categoria"
  },
  id_provedora: {
    type: DataTypes.BIGINT,
    allowNull: false,
    references: {
      model: Provedora,
      key: 'id_provedora'
    },
    field: "id_provedora"
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "created_at"
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: "updated_at",
  },
}, {
  tableName: "logistica",
});

// Associations (optional)
Logistica.belongsTo(CategoriaMaterialLogistica, { foreignKey: "id_categoria" });
Logistica.belongsTo(Provedora, { foreignKey: "id_provedora" });

module.exports = Logistica;
