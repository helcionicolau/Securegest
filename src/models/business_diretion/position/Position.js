// models/Posicao.js

const { DataTypes } = require("sequelize");
const sequelize = require("../../../utils/sequelize");
const Zona = require("../zone/Zone");
const Cliente = require("../clients/Client");
const Municipio = require("../../counties/County");

const Posicao = sequelize.define('posicao', {
  id_posicao: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_posicao"
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
  id_zona: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_zona",
    references: {
      model: Zona,
      key: 'id_zona'
    }
  },
  id_cliente: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "id_cliente",
    references: {
      model: Cliente,
      key: 'id_cliente'
    }
  },
  n_postos: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "n_postos"
  },
  id_municipio: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "id_municipio",
    references: {
      model: Municipio,
      key: 'id_municipio'
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
  tableName: "posicao",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Posicao.belongsTo(Zona, { foreignKey: 'id_zona', as: 'zona' });
Posicao.belongsTo(Cliente, { foreignKey: 'id_cliente', as: 'cliente' });
Posicao.belongsTo(Municipio, { foreignKey: 'id_municipio', as: 'municipio' });

module.exports = Posicao;