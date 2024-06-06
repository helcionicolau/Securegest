const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Posicao = require("../../business_diretion/position/Position");

const Projeto = sequelize.define('projetos', {
  id_projeto: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_projeto"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  sumario: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "sumario"
  },
  tipo_projeto: {
    type: DataTypes.ENUM('Interno','Externo'),
    allowNull: false,
    field: "tipo_projeto"
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
  tableName: "projetos",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define foreign key relationship (assuming 'Posicao' model exists)
Projeto.belongsTo(Posicao, { foreignKey: 'id_posicao', as: 'posicao' });

module.exports = Projeto;