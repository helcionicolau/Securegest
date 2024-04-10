const sequelize = require("../../../utils/sequelize");
const Departamento = require("../departments/Department");

const Funcionario = sequelize.define('funcionario', {
  id_funcionario: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    autoIncrement: true,
    field: "id_funcionario"
  },
  n_mec: {
    type: DataTypes.BIGINT,
    allowNull: true,
    field: "n_mec"
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nome"
  },
  sexo: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "sexo"
  },
  estado_civil: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "estado_civil"
  },
  data_nascimento: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: "data_nascimento"
  },
  nif: {
    type: DataTypes.STRING,
    allowNull: true,
    field: "nif"
  },
  data_contratacao: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    field: "data_contratacao"
  },
  data_registro: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'data_registro'
  },
  data_atualizacao: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
    field: 'data_atualizacao'
  },
  salario: {
    type: DataTypes.DOUBLE,
    allowNull: true,
    field: "salario"
  },
  departamento_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: "departamento_id",
    references: {
      model: Departamento,
      key: 'id_departamento'
    }
  },
  carga_horaria_diaria: {
    type: DataTypes.TIME,
    allowNull: true,
    field: "carga_horaria_diaria"
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
  tableName: "funcionarios",
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

Funcionario.belongsTo(Departamento, { foreignKey: 'departamento_id', as: 'departamento' });

module.exports = Funcionario;