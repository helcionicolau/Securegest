const db = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Area = require("../area/Area");

const Zona = db.define('zona', {
  id_zona: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_zona"
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
  id_area: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: "id_area",
    references: {
      model: Area,
      key: 'id_area'
    }
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
  tableName: "zona",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Zona.belongsTo(Area, { foreignKey: 'id_area', as: 'area' });

module.exports = Zona;