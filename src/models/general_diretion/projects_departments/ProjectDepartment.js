const sequelize = require("../../../utils/sequelize");
const { DataTypes } = require("sequelize");
const Projeto = require("../projects/Project");
const Departamento = require("../../rh/departments/Department");

const ProjetoDepartamento = sequelize.define('projetos_departamentos', {
  id_pd: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    field: "id_pd"
  },
  nome: {
    type: DataTypes.STRING(255),
    allowNull: true,
    field: "nome"
  },
  descricao: {
    type: DataTypes.TEXT,
    allowNull: true,
    field: "descricao"
  },
  id_projeto: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "id_projeto",
    references: {
      model: Projeto,
      key: 'id_projeto'
    }
  },
  id_departamento: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "id_departamento",
    references: {
      model: Departamento,
      key: 'id_departamento'
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
  tableName: "projetos_departamentos",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

// Define many-to-many relationship between Projeto and Departamento through ProjetoDepartamento
ProjetoDepartamento.belongsToMany(Projeto, { through: 'projetos_departamentos', foreignKey: 'id_projeto' });
ProjetoDepartamento.belongsToMany(Departamento, { through: 'projetos_departamentos', foreignKey: 'id_departamento' });

module.exports = ProjetoDepartamento;
