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
  data_inicio: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data_inicio'
  },
  data_final_prevista: {
    type: DataTypes.DATE,
    allowNull: true,
    field: 'data_final_prevista'
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
ProjetoDepartamento.belongsTo(Projeto, { through: 'projetos_departamentos', foreignKey: 'id_projeto', as: 'projeto' });
ProjetoDepartamento.belongsTo(Departamento, { through: 'projetos_departamentos', foreignKey: 'id_departamento', as: 'departamento' });

module.exports = ProjetoDepartamento;
