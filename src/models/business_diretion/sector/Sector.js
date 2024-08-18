const { DataTypes } = require( "sequelize" );
const sequelize = require( "../../../utils/sequelize" );
const Zona = require("../zone/Zone");

const Sector = sequelize.define('sector', {
  id_sector: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_sector"
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: false,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_zona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_zona",
    references: {
      model: Zona,
      key: 'id_zona'
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
  tableName: "sector",
  timestamps: false,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Sector.belongsTo(Zona, { foreignKey: 'id_zona', as: 'zona' });

module.exports = Sector;
