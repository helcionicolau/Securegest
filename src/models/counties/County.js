// models/Municipio.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../utils/sequelize");
const Provincia = require("../provinces/Province");

const Municipio = sequelize.define('municipios', {
  id_municipio: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_municipio"
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "name"
  },
  sigla: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sigla"
  },
  provincia_id: {
    type: DataTypes.BIGINT,
    allowNull: false,
    field: "provincia_id",
    references: {
      model: Provincia,
      key: 'id_provincia'
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
  tableName: "municipios",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Municipio.belongsTo(Provincia, { foreignKey: 'provincia_id', as: 'provincia' });

module.exports = Municipio;
