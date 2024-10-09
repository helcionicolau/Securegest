const { DataTypes } = require('sequelize');
const sequelize = require('../../../utils/sequelize');

const Empresa = sequelize.define('empresa', {
  id_empresa: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: 'id_empresa'
  },
  nome_empresa: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'nome_empresa'
  },
  descricao_empresa: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: 'descricao_empresa'
  },
  endereco_empresa: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'endereco_empresa'
  },
  email_empresa: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'email_empresa'
  },
  telefone_empresa: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'telefone_empresa'
  },
  website_empresa: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'website_empresa'
  },
  is_active: {
    type: DataTypes.TINYINT,
    allowNull: false,
    defaultValue: 1,
    field: 'is_active'
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
  tableName: 'empresa',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Empresa;
