const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Posicao = require( "../../business_diretion/position/Position" );

const Posto = sequelize.define('posto', {
  id_posto: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    field: "id_posto"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_posicao: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_posicao",
    references: {
      model: Posicao,
      key: 'id_posicao'
    }
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "latitude"
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "longitude"
  }
}, {
  tableName: "posto",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Posto.belongsTo( Posicao, { foreignKey: 'id_posicao', as: 'posicao' } );

module.exports = Posto;
